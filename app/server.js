const { buildService } = require('@digicatapult/wasp-payload-processor')
const { WASP_SENSOR_TYPE } = require('./env')

const payloadProcessor =
  ({ logger }) =>
  ({ thingId, timestamp, payload }) => {
    if (payload.messageType !== 'DATA') {
      throw new Error(`Unexpected messageType: "${payload.messageType}"`)
    }
    switch (payload.appId) {
      case 'DUMMY_READING':
        return {
          readings: [
            {
              dataset: {
                thingId,
                type: 'dummy_type',
                label: 'dummy_label',
                unit: 'dummy_unit',
              },
              timestamp,
              value: parseFloat(payload.data), // Parse the data and convert it to a readable or desired format
            },
          ],
        }
      case 'DUMMY_EVENT':
        return {
          events: [
            {
              thingId,
              timestamp,
              type: 'dummy_event_type',
              details: {},
            },
          ],
        }
      case 'DUMMY_IGNORED':
        logger.info(`Ignoring DUMMY_IGNORED ${payload.appId}`)
        break
      default:
        throw new Error(`Unexpected appId: ${payload.appId}`)
    }
  }

const { startServer, createHttpServer } = buildService({
  sensorType: WASP_SENSOR_TYPE,
  payloadProcessor,
})

module.exports = { startServer, createHttpServer }
