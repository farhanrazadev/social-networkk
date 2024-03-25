import { Body, Controller, Param, Patch, Post, Req, Res, UseGuards, Headers, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authlogin.dto'

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post()
async login(@Body() loginDto: AuthLoginDto): Promise<any> {
    const { Email, Password } = loginDto;
    const response = await this.authService.login(Email, Password);
    return response;
  }
@Post('refresh-token')
  async refreshAccessToken(@Headers('authorization') authorization: string,) {
    try {
      const newAccessToken = await this.authService.refreshAccessToken(authorization);
      // Set the new access token in the response
      return({ access_token: newAccessToken.access_token });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


}