import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/user.decorator';
import { ReqUserDto } from '../users/dto/req-user.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(@Body() data: CreatePostDto, @User() user: ReqUserDto) {
    return this.postService.createPost(data, user.id);
  }
}
