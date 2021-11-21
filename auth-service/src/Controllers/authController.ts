import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../Services/auth/auth.service';
import { ServerInfoInterface } from '../Interfaces/ServerInfoInterface';
import { UserAuthInterface } from '../Interfaces/UserAuthInterface';
import { UserRegisterDataInterface } from '../Interfaces/UserRegisterDataInterface';
import { PasswordResetInterface } from '../Interfaces/PasswordResetInterface';
import { AuthGuard } from '../Guards/AuthGuard';
import { ProfileId } from '../Decorators/ProfileIdDecorator';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/info')
  getServerStatus() {
    return 'This is the Auth service - auth controller';
  }

  @Post('/login')
  async login(@Body() authData: UserAuthInterface) {
    return this.authService.loginUser(authData);
  }

  @Post('/register')
  register(@Body() registerData: UserRegisterDataInterface) {
    return this.authService.registerUser(registerData);
  }

  @Post('/forgotPassword')
  forgotPassword(@Body() email: string) {
    return this.authService.forgotPassword(email);
  }
  //verified route, must pass jwt
  @Post('/resetPassword')
  @UseGuards(AuthGuard)
  resetPassword(@Body() resetPassword: PasswordResetInterface) {
    return this.authService.resetPassword(resetPassword);
  }

  @Get('/verifyToken')
  @UseGuards(AuthGuard)
  verifyToken() {
    return true;
  }

  @Get('/isUserManager')
  @UseGuards(AuthGuard)
  isUserAdmin(@ProfileId() profileId: string) {
    return this.authService.isUserManager(profileId);
  }
}
