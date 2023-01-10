import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from 'src/config/cache';

class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const result = await this.client.get(key);
    if (!result) return null;

    const parserResult = JSON.parse(result) as T;
    return parserResult;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisCache();
