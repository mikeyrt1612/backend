import { Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import config from '@config'

const signinRouter = Router()

signinRouter.post('/', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      res.sendStatus(500)
    } else if (!user) {
      res.status(401)
      res.json(info)
    } else {
      res.json({
        token: jwt.sign(user, config.secrets.jwt),
      })
    }
  })(req, res)
})

export default signinRouter
