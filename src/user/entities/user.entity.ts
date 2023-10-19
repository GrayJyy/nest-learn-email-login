import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, comment: '用户名' })
  username: string;
  @Column({ length: 18, comment: '密码' })
  password: string;
  @Column({ length: 50, comment: '邮箱' })
  email: string;
}
