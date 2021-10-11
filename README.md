# wasp-payload-parser-template

Template repository for bootstrapping new WASP payload parsers. Use this repo as a template in github when creating new `WASP` payload parsers. When forked a new pull request will automatically be created in the new repository to apply templating. A release workflow will run on merging.

## What this repo provides

This repo provides:

- basic node.js project structure for a WASP payload parser
- linting with WASP prettier configuration
- open-sourcing materials
- Docker file
- A simple helm chart for the payload parser
- Testing apparatus using `mocha`, `chai` and `supertest`
- Github workflows for testing and release

## Getting started

`wasp-payload-parser-template` can be run in a similar way to most nodejs applications. First install required dependencies using `npm`:

```sh
npm install
```

### Testing
For integration testing, `wasp-payload-parser-template` depends on Kafka and Zookeeper. These can be brought locally up using docker:

```sh
docker-compose up -d
```

You can then run tests with:

```sh
npm test
```

## Environment Variables

`wasp-payload-parser-template` is configured primarily using environment variables as follows:

| variable         | required |            default             | description                                        |
| :--------------- | :------: | :----------------------------: | :------------------------------------------------- |
| WASP_SENSOR_TYPE |    N     | `wasp-payload-parser-template` | Type of this sensor/thing for `wasp-thing-service` |

The following environment variables configure the use of [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor):

| variable                     | required |     default      | description                                                                             |
| :--------------------------- | :------: | :--------------: | :-------------------------------------------------------------------------------------- |
| PORT                         |    N     |      `3000`      | Port on which the service will listen                                                   |
| LOG_LEVEL                    |    N     |      `info`      | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]    |
| KAFKA_LOG_LEVEL              |    N     |    `nothing`     | Logging level for Kafka. Valid values are [`debug`, `info`, `warn`, `error`, `nothing`] |
| KAFKA_BROKERS                |    N     | `localhost:9092` | List of addresses for the Kafka brokers                                                 |
| KAFKA_READINGS_TOPIC         |    N     |    `readings`    | Outgoing Kafka topic for readings                                                       |
| KAFKA_EVENTS_TOPIC           |    N     |     `events`     | Outgoing Kafka topic for events                                                         |
| KAFKA_PAYLOAD_ROUTING_PREFIX |    N     |    `payloads`    | Prefix for incoming Kafka topics for payloads                                           |
