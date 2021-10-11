const DUMMY_READING_PAYLOAD_1 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'dummy_thing_type',
      ingest: 'dummy_ingest',
      ingestId: 'dummy_ingest_id',
      timestamp: messageTimestamp,
      payload: {
        appId: 'DUMMY_READING',
        data: '20.9',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'dummy_type',
        label: 'dummy_label',
        unit: 'dummy_unit',
      },
      timestamp: messageTimestamp,
      value: 20.9,
    },
  ],
  expectedEvents: [],
})

const DUMMY_READING_PAYLOAD_2 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'dummy_thing_type',
      ingest: 'dummy_ingest',
      ingestId: 'dummy_ingest_id',
      timestamp: messageTimestamp,
      payload: {
        appId: 'DUMMY_READING',
        data: '70.9',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'dummy_type',
        label: 'dummy_label',
        unit: 'dummy_unit',
      },
      timestamp: messageTimestamp,
      value: 70.9,
    },
  ],
})

const DUMMY_EVENT_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'dummy_thing_type',
      ingest: 'dummy_ingest',
      ingestId: 'dummy_ingest_id',
      timestamp: messageTimestamp,
      payload: {
        appId: 'DUMMY_EVENT',
        data: 'DUMMY_EVENT_DATA',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: messageTimestamp,
      type: 'dummy_event_type',
      details: {},
    },
  ],
})

const UNEXPECTED_MESSAGE_TYPE_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'dummy_thing_type',
      ingest: 'dummy_ingest',
      ingestId: 'dummy_ingest_id',
      timestamp: messageTimestamp,
      payload: {
        appId: 'UNEXPECTED',
        data: '20.0',
        messageType: 'invalid',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

const UNEXPECTED_APP_ID_PAYLOAD = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'dummy_thing_type',
      ingest: 'dummy_ingest',
      ingestId: 'dummy_ingest_id',
      timestamp: messageTimestamp,
      payload: {
        appId: 'invalid',
        data: '',
        messageType: 'DATA',
      },
      metadata: {},
    }),
  },
  expectedReadings: [],
  expectedEvents: [],
})

module.exports = {
  DUMMY_READING_PAYLOAD_1,
  DUMMY_READING_PAYLOAD_2,
  DUMMY_EVENT_PAYLOAD,
  UNEXPECTED_MESSAGE_TYPE_PAYLOAD,
  UNEXPECTED_APP_ID_PAYLOAD,
}
