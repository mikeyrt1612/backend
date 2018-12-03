import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import config from '@config'
import localVerify from './local'
import jwtVerify from './jwt'
import testingLocalVerify from './local/testing'

passport.use(new LocalStrategy(localVerify))

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secrets.jwt,
  },
  jwtVerify,
))

// e2e testing authentication
passport.use('testingLocal', new LocalStrategy(
  {
    usernameField: 'u',
    passwordField: 'p',
  },
  testingLocalVerify,
))
