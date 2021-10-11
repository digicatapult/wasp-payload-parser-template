const { before, after } = require('mocha')
const request = require('supertest')

const { createHttpServer } = require('../../../app/server')

const setupServer = (context) => {
  before(async function () {
    this.timeout(30000)
    Object.assign(context, await createHttpServer())
    context.request = request(context.app)
  })

  after(async function () {
    this.timeout(10000)
    await context.payloadPipeline.disconnect()
  })
}

module.exports = { setupServer }
