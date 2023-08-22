import envalid from 'envalid'
import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
}

const vars = envalid.cleanEnv(
  process.env,
  {
    WASP_SENSOR_TYPE: envalid.str({ default: 'wasp-payload-parser-template' }),
  },
  {
    strict: true,
  }
)

export default vars
