import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import { connect } from './db'
import apiRouter from './routes/api'
import testingRouter from './routes/testing'
import signinRouter from './routes/signin'
import './auth'

connect()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(morgan('dev'))

app.use('/api', passport.authenticate('jwt', { session: false }), apiRouter)
app.use('/testing', passport.authenticate('testingLocal', { session: false }), testingRouter)
app.use('/signin', signinRouter)

export default app
