import { str } from 'envalid'
import { logsValidators, mongoValidators, redisValidators, validateEnv } from '../../src/env.js'

describe('validateEnv', () => {
  beforeEach(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    vi.spyOn(console, 'error').mockImplementation(() => false)
  })

  it('should return base and redis envs', () => {
    const env = validateEnv(redisValidators)
    expect(env).toEqual({
      APP_STAGE: 'test',
      REDIS_PASSWORD: 'REDIS_PASSWORD',
      REDIS_CACHE_DURATION: 1200,
      REDIS_HOST: 'localhost',
      REDIS_PORT: 12,
    })
  })

  it('should return base and mongo envs', () => {
    const env = validateEnv(mongoValidators)
    expect(env).toEqual({
      APP_STAGE: 'test',
      DB_URL: 'DB_URL',
    })
  })

  it('should return base and logs envs', () => {
    const env = validateEnv(logsValidators)
    expect(env).toEqual({
      APP_STAGE: 'test',
      LOG_SILENT: true,
    })
  })

  it('should return base and custom envs', () => {
    const env = validateEnv({ CUSTOM_ENV: str() })
    expect(env).toEqual({
      APP_STAGE: 'test',
      CUSTOM_ENV: 'customenv',
    })
  })
})
