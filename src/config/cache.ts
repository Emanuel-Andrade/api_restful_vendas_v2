import { load } from 'ts-dotenv/index';
import { RedisOptions } from 'ioredis';

interface ICacheOptions {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

const env = load({
  REDIS_HOST: String,
  REDIS_PORT: Number,
});

export default {
  config: {
    redis: {
      host: env.REDIS_HOST,
      password: undefined,
      port: env.REDIS_PORT,
    },
  },
  driver: 'redis',
} as ICacheOptions;
