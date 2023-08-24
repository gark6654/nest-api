import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with ${email} not found`);
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const candidate = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (candidate) {
      throw new ForbiddenException(`User with ${data.email} already exists`);
    }

    return await this.prismaService.user.create({ data });
  }
}
