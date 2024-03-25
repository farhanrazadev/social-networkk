import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {

    constructor(
        private readonly userservice: UserService
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = this.userservice.create(createUserDto);
        return user
    }
    @Patch(':id')
    async update(@Param('id') userId: number) {
      return this.userservice.updateUser(userId);
    }
  
}
