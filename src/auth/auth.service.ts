import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/Entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.getUser(email);
    if (!user || !(await bcrypt.compare(password, user.Password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.Email };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '500m',
      secret: process.env.JWT_SECRET,
    });
    const refresh_token = this.jwtService.sign({}, {
      expiresIn: '10m',
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return { access_token, refresh_token };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = { sub: user.id, email: user.Email };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      });
      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
export { UserService };



// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from './../user/user.service';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './../user/Entity/user.entity';


// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UserService,
//     private readonly jwtService: JwtService,
//   ) { }

//   async getUser(email: string): Promise<User | null> {
//     return this.usersService.findByEmail(email);
//   }

//   async login(email: string, password: string): Promise<any> { // Add 'res' parameter
//     const user = await this.getUser(email);
//     if (!user || !(await bcrypt.compare(password, user.Password))) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { sub: user.id, email: user.Email };
//     const access_token = this.jwtService.sign(payload, {
//       expiresIn: '500m',
//       secret: process.env.JWT_SECRET
//     });
//     const refresh_token = this.jwtService.sign({}, {
//       expiresIn: '10m',
//       secret: process.env.JWT_REFRESH_SECRETs,
//     });
//     return { access_token, refresh_token };
//   }

//   async refreshAccessToken(authorizationHeader: string): Promise<{ access_token: string }> {
//     try {
//       const tokenParts = authorizationHeader.split(' ');

//       if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
//         throw new UnauthorizedException('Invalid token format');
//       }

//       const refreshToken = tokenParts[1];
//       const decoded = this.jwtService.verify(refreshToken, {
//         secret: process.env.JWT_REFRESH_SECRET,
//       });

//       const user = await this.usersService.findById(decoded.sub);

//       if (!user) {
//         throw new UnauthorizedException('Invalid refresh token');
//       }

//       const payload = { sub: user.id, email: user.Email };
//       const access_token = this.jwtService.sign(payload, {
//         expiresIn: '1h',
//         secret: process.env.JWT_SECRET,
//       });
//       return { access_token };
//     } catch (error) {
//       throw new UnauthorizedException('Invalid refresh token');
//     }
    
//   }
// }
// export { UserService };

