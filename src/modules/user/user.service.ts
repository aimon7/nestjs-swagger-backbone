import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [
        { email: usernameOrEmail },
        { username: usernameOrEmail },
      ],
    });
  }

  async createUser(user: User | Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async updateUser(id: number, user: User | Partial<User>): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
