import http from 'http'
import app from './app'
import { AddressInfo } from 'net'

import config from '@config'

const server = http.createServer(app)
let currentApp = app
server.listen(config.port, () => {
  console.log(`Server listening on port ${(<AddressInfo>server.address()).port}`)
})

if (module.hot) {
  module.hot.accept('./app', () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
