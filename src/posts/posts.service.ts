import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * author : string;
 * title : string;
 * content : string;
 * likeCount : number;
 * commentCount : number;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고있는 민지',
    likeCount: 2000,
    commentCount: 1000,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 혜리',
    content: '노래 연습하고 있는 혜리',
    likeCount: 3921,
    commentCount: 1243,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '공연중인 로제',
    content: '노래하는 로제',
    likeCount: 1332,
    commentCount: 1255,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    const post = await this.getPostById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    author && (post.author = author);
    title && (post.title = title);
    content && (post.content = content);

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.getPostById(postId);

    if (!post) {
      throw new NotFoundException();
    }
    await this.postsRepository.delete(postId);
  }
}
