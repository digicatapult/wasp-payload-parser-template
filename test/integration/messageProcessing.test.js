import { describe, before, it } from 'mocha'
import { expect } from 'chai'
import moment from 'moment'
import { setupServer } from './helpers/server.js'
import { setupKafka } from './helpers/kafka.js'
import env from '../../app/env.js'

import {
  DUMMY_READING_PAYLOAD_1,
  DUMMY_READING_PAYLOAD_2,
  DUMMY_EVENT_PAYLOAD,
  UNEXPECTED_MESSAGE_TYPE_PAYLOAD,
  UNEXPECTED_APP_ID_PAYLOAD,
} from './data/payloads.js'

const { WASP_SENSOR_TYPE } = env

describe('message Processing', function () {
  const context = {}
  setupServer(context)
  setupKafka(context)

  const singlePayloadTest = ({ context, description, payloadTemplate, expectation }) => {
    describe(description, function () {
      let payload

      before(async function () {
        payload = payloadTemplate(new Date().toISOString())
        context.result = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payload.message,
          1
        )
      })

      it(expectation, function () {
        const readings = context.result.get('readings')
        expect(readings).to.deep.equal(payload.expectedReadings)
        const events = context.result.get('events')
        expect(events).to.deep.equal(payload.expectedEvents)
      })
    })
  }

  describe('happy path', function () {
    singlePayloadTest({
      context,
      description: 'single reading',
      payloadTemplate: DUMMY_READING_PAYLOAD_1,
      expectation: 'should forward the correct reading',
    })
    singlePayloadTest({
      context,
      description: 'single reading',
      payloadTemplate: DUMMY_READING_PAYLOAD_1,
      expectation: 'should forward the correct reading',
    })

    singlePayloadTest({
      context,
      description: 'dummy event',
      payloadTemplate: DUMMY_EVENT_PAYLOAD,
      expectation: 'should forward the correct event',
    })

    describe('multiple readings', function () {
      let payloadOne
      let payloadTwo

      before(async function () {
        const timestampOne = moment().subtract(2, 'day').toISOString()
        payloadOne = DUMMY_READING_PAYLOAD_1(timestampOne)
        context.resultOne = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payloadOne.message,
          1
        )

        const timestampTwo = moment().subtract(1, 'day').toISOString()
        payloadTwo = DUMMY_READING_PAYLOAD_2(timestampTwo)
        context.resultTwo = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payloadTwo.message,
          1
        )
      })

      it('should forward the correct readings', function () {
        const readingsResultOne = context.resultOne.get('readings')
        expect(readingsResultOne).to.deep.equal(payloadOne.expectedReadings)

        const readingsResultTwo = context.resultTwo.get('readings')
        expect(readingsResultTwo).to.deep.equal(payloadTwo.expectedReadings)
      })
    })
  })

  describe('unexpected payloads', function () {
    singlePayloadTest({
      context,
      description: 'unexpected message type',
      payloadTemplate: UNEXPECTED_MESSAGE_TYPE_PAYLOAD,
      expectation: 'should not forward',
    })

    singlePayloadTest({
      context,
      description: 'unexpected app ID',
      payloadTemplate: UNEXPECTED_APP_ID_PAYLOAD,
      expectation: 'should not forward',
    })
  })
})
