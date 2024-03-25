import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user/Entity/user.entity';
import { PostEntity } from './post/entity/post.entity';
import { PostModule } from './post/post.module';


// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       load: [configurations],
//       isGlobal: true, 
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       username: 'postgres',
//       port: 5432,
//       password: 'my',
//       database: 'social_network',
//       entities: [User, PostEntity],
//       synchronize: true,

//     }),
//     UserModule,
//     AuthModule,
//     ConfigModule,
//     PostModule,
//   ],
//   controllers: [PostController,AuthController], 
//   providers: [PostService, AuthService],
// })
// export class AppModule {}


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      password: 'my',
      database: 'social_network',
      entities: [User, PostEntity],
      synchronize: true,

    }),
  
    UserModule,
    AuthModule,
    PostModule,

    ConfigModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }