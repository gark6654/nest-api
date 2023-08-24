import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { BCRYPT_SALT_ROUNDS } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(data: AuthLoginDto): Promise<string> {
    const user = await this.userService.findByEmail(data.email);

    const isMatch = await compare(data.password, user.password);

    if (!isMatch) {
      throw new HttpException('Password is not valid', HttpStatus.UNAUTHORIZED);
    }

    const tokenPayload = { id: user.id, email: user.email };

    return await this.jwtService.signAsync(tokenPayload);
  }

  async register(data: CreateUserDto): Promise<string> {
    const passwordHash = await hash(data.password, BCRYPT_SALT_ROUNDS);
    const createdUser = await this.userService.createUser({
      ...data,
      password: passwordHash,
    });

    const tokenPayload = { id: createdUser.id, email: createdUser.email };

    return await this.jwtService.signAsync(tokenPayload);
  }
}
