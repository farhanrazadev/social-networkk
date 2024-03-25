import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../user/Entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LocalStrategy } from './local.strategy';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    
    
    JwtModule.registerAsync({
      imports : [ConfigModule],
      useFactory:async () => ({ 
        secret : process.env.JWT_SECRET,
        signOptions : {expiresIn : "3m"}
        
      }),
      inject : [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, Repository<User>,  LocalStrategy],
  exports : []
})
export class AuthModule {}