import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const _client = createClient({
          socket: {
            host: configService.get('application.redis.host'),
            port: configService.get('application.redis.port'),
          },
        });
        await _client.connect();
        return _client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
