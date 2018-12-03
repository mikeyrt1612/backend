import { Diff, Intersection, DeepReadonly } from 'utility-types'

import prodConfig from './prod'
import devConfig from './dev'

export type IConfig = DeepReadonly<{
  port: number,
  testing: {
    username: string,
    password: string,
  },
  secrets: {
    jwt: string,
  },
  db: {
    url: string,
  },
}>

export type IBaseConfig = Intersection<{
  port: number,
  testing: {
    username: string,
    password: string,
  },
}, IConfig>

export type IOverrideConfig = Diff<IConfig, IBaseConfig> & Partial<IBaseConfig>

const baseConfig: IBaseConfig = {
  port: 4000,
  testing: {
    username: 'test',
    password: 'password',
  },
}

let envConfig: IOverrideConfig

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    envConfig = prodConfig
    break
  case 'dev':
  case 'development':
  default:
    envConfig = devConfig
    break
}

const config: IConfig = Object.assign<{}, IBaseConfig, IOverrideConfig>({}, baseConfig, envConfig)

export default config
