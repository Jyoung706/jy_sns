import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //    1) Get /posts
  //      모든 post를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  //    2) Get /posts/:id
  //      id에 해당되는 post를 가져온다
  //      ex) id가 1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  //    3) Post /posts
  //       post를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  //    4) Patch /posts/:id
  //       id에 해당하는 post를 변경
  @Patch(':id')
  petchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }

  //    5) Delete /posts/:id
  //       해당하는 id를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    this.postsService.deletePost(+id);
  }
}
