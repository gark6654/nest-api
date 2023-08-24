import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() data: AuthLoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
