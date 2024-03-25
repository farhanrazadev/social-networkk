import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from './../user/user.service'; 
import { User } from 'src/user/Entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity, User])
        
      ],
  controllers: [PostController],
  providers: [PostService, UserService, JwtService], 
})
export class PostModule {}
