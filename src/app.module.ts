import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './configs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          host: configService.get('application.db.host'),
          port: configService.get('application.db.port'),
          type: 'mysql',
          username: configService.get('application.db.username'),
          password: configService.get('application.db.password'),
          database: configService.get('application.db.database'),
          entities: [User],
          synchronize: true,
          logging: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
        };
      },
    }),
    UserModule,
    EmailModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
