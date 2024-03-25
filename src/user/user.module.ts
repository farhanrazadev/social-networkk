import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostService } from 'src/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { PostEntity } from 'src/post/entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PostEntity])
   
  ],
  controllers: [UserController],
  providers: [UserService, PostService]
})
export class UserModule {}
