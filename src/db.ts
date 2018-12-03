import mongoose from 'mongoose'

import config from '@config'

mongoose.Promise = Promise
mongoose.connection.on('error', error => console.error(error))

export const connect = () =>
  mongoose.connect(config.db.url)
