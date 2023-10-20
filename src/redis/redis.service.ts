import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private readonly redisService: RedisClientType;

  async get(key: string) {
    return await this.redisService.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisService.set(key, value);
    ttl && (await this.redisService.expire(key, ttl));
  }
}
