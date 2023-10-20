import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Get('code')
  async getCode(@Query('to') to: string) {
    const _code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${to}`, _code, 5 * 60);
    try {
      const _messageId = await this.emailService.sendMail(
        to,
        '验证码',
        `<p>你的验证码是 ${_code}</p>`,
      );
      return new HttpException(
        {
          success: true,
          message: '发送成功',
          messageId: _messageId,
        },
        HttpStatus.OK,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException(
        {
          success: false,
          message: '发送失败',
          messageId: '',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
