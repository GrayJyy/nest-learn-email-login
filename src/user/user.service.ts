import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async findUserByEmail(email: string) {
    const _foundedUser = await this.entityManager.findOneBy(User, { email });
    return _foundedUser;
  }

  async login({ email, code }: LoginUserDto) {
    const _foundedCode = await this.redisService.get(`captcha_${email}`);
    if (!_foundedCode) throw new UnauthorizedException('验证码已失效');
    if (_foundedCode !== code) throw new UnauthorizedException('验证码不正确');
    const _user = await this.findUserByEmail(email);
    console.log(_user);
    return '验证成功';
  }
}
