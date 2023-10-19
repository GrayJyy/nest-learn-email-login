import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('application.email.user'),
        pass: this.configService.get('application.email.pass'),
      },
    });
  }
  getEnv() {
    console.log(this.configService.get('application.email.user'));
  }
}
