import { VerifyFunction } from 'passport-local'

import Users from '@models/users'

const localVerify: VerifyFunction = async (username, password, done) => {
  try {
    const doc = await Users
      .findOne({ username })
      .select('password')
      .exec()

    if (!doc) {
      done(null, false, { message: 'Unknown username' })
    } else if (doc.password !== password) {
      done(null, false, { message: 'Incorrect password' })
    } else {
      done(null, { id: doc._id })
    }
  } catch (err) {
    done(new Error())
  }
}

export default localVerify
