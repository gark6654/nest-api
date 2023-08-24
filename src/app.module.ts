import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  providers: [AppService, PrismaService],
  controllers: [AppController],
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
})
export class AppModule {}
