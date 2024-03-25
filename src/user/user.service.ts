import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.findByEmail(createUserDto.Email);
        // if (existingUser) {
        //     throw new ConflictException("User Already Exists")
        // }

        const user = this.userRepository.create(createUserDto)
        await this.userRepository.save(user)
        return { user };
    }
    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                Email: email,
            },
        });
        return user;
    }

    async findById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async updateUser(userId: number): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });

        if (!existingUser) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return existingUser;
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.remove(user);
        return user;
    }

}


