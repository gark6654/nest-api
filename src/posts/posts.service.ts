import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return await this.prismaService.post.findMany();
  }

  async findById(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(data: CreatePostDto, authorId: number): Promise<Post> {
    const createdPost = await this.prismaService.post.create({
      data: {
        ...data,
        authorId,
      },
    });

    return createdPost;
  }
}
