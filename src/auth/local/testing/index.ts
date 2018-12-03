import { VerifyFunction } from 'passport-local'

import config from '@config'

const testingLocalVerify: VerifyFunction = async (username, password, done) => {
  try {
    if (username !== config.testing.username || password !== config.testing.password) {
      done(null, false, { message: 'Incorrect credentials' })
    } else {
      done(null, { id: 'someTestId' })
    }
  } catch (err) {
    done(new Error())
  }
}

export default testingLocalVerify
