import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  Fullname: string;

  @Column({ nullable: true })
  Email: string;

  @Column({ nullable: true })
  Password: string;

  @Column({ nullable: true })
  address: string;

  // @OneToMany(() => Post, post => post.user)
  // posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    if (this.Password) {
      this.Password = await bcrypt.hash(this.Password, 8);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.Password);
  }
}
