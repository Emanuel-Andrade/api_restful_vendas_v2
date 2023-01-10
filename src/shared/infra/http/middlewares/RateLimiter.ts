import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from 'src/shared/errors/appError';
import { load } from 'ts-dotenv';

const env = load({
  REDIS_HOST: String,
  REDIS_PORT: Number,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      port: env.REDIS_PORT,
      host: env.REDIS_HOST,
      password: undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
