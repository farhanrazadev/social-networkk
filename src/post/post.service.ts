import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(title: string, content: string, authorId: number, fileId?: number): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = title;
    post.content = content;
    post.fileId = fileId; // Assuming fileId is a field in PostEntity

    return await this.postRepository.save(post);
  }

  async updatePost(id: number, title?: string, content?: string): Promise<PostEntity | null> {
    const post = await this.postRepository.findOne({where:{id}});
    if (!post) {
      return null;
    }
    if (title !== undefined) {
      post.title = title;
    }
    if (content !== undefined) {
      post.content = content;
    }
    return await this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async getPostById(id: number): Promise<PostEntity | null> {
    return await this.postRepository.findOne({where: {id}});
  }

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }
}
