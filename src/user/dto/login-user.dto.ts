import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(9, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  code: string;
}
