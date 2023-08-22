import { before, after } from 'mocha'
import request from 'supertest'

import { createHttpServer } from '../../../app/server.js'

export const setupServer = (context) => {
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
