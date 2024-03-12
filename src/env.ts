import dotenv from 'dotenv'
import { CleanedEnv, RequiredValidatorSpec, ValidatorSpec, bool, cleanEnv, host, num, port, str } from 'envalid'

dotenv.config()

type BaseEnv = { APP_STAGE: RequiredValidatorSpec<'local' | 'dev' | 'prod' | 'test'> }

type RedisEnv = {
  REDIS_HOST: ValidatorSpec<string>
  REDIS_PORT: ValidatorSpec<number>
  REDIS_PASSWORD: ValidatorSpec<string>
  REDIS_CACHE_DURATION: ValidatorSpec<number>
}

type MongoEnv = {
  DB_URL: ValidatorSpec<string>
}

type LogsEnv = {
  LOG_SILENT: ValidatorSpec<boolean>
}

const baseValidators = {
  APP_STAGE: str({ choices: ['local', 'dev', 'prod', 'test'] }),
}

export const redisValidators: RedisEnv = {
  REDIS_HOST: host({ default: undefined }),
  REDIS_PORT: port({ default: 6379 }),
  REDIS_PASSWORD: str({ default: undefined }),
  REDIS_CACHE_DURATION: num({ default: 3600 * 24 }),
}

export const mongoValidators: MongoEnv = {
  DB_URL: str({ default: undefined }),
}

export const logsValidators: LogsEnv = {
  LOG_SILENT: bool({ default: false }),
}

export function validateEnv<T>(validators: T): CleanedEnv<BaseEnv & T> {
  return {
    ...cleanEnv<T>(process.env, validators),
    ...cleanEnv<BaseEnv>(process.env, baseValidators),
  }
}
