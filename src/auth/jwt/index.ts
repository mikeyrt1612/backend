import { VerifyCallback } from 'passport-jwt'

import { IUser } from '../model'
import Users from '@models/users'

const jwtVerify: VerifyCallback = async (jwtPayload: IUser, done) => {
  try {
    const doc = await Users.findById(jwtPayload.id)
    if (doc) {
      done(null, jwtPayload)
    } else {
      done(null, false)
    }
  } catch (err) {
    done(null, false)
  }
}

export default jwtVerify
