import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { LocalAuthGuard } from './../auth/auth.guard';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(LocalAuthGuard) 
    @Post()
    async createPost(@Body() postData: { title: string; content: string; authorId: number, fileId?: number }) {
        const { title, content, authorId, fileId } = postData;
        return this.postService.createPost(title, content, authorId, fileId);
    }

    @UseGuards(LocalAuthGuard) 
    @Patch(':id')
    async updatePost(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string,
    ) {
        return this.postService.updatePost(id, title, content);
    }

    @UseGuards(LocalAuthGuard) 
    @Delete(':id')
    async deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }

    @UseGuards(LocalAuthGuard)
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @UseGuards(LocalAuthGuard)
    @Get()
    async getAllPosts() {
        return this.postService.getAllPosts();
    }
}
