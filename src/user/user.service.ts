import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './models/user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private authService: AuthService,
    ) {
    }

    async getAllUsers(): Promise<UserDto[]> {
        return await this.userRepository.find();
    }

    async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
        return await this.userRepository.findOne({
            where: [
                {email: usernameOrEmail},
                {username: usernameOrEmail},
            ],
        });
    }

    async createUser(user: CreateUserDto): Promise<UserDto> {
        const passwordHash = await this.authService.hashPassword(user.password);
        const {...newUser} = user;
        newUser.password = passwordHash;

        let savedUser: UserDto;
        try {
            savedUser = await this.userRepository.save(newUser);
            console.log(`User ${savedUser.username} is saved successfully`)
        } catch (e) {
            throw new ConflictException(`User with the same username or email is already in our database`);
        }

        return savedUser;
    }

    async getUserById(id: number): Promise<UserDto> {
        return await this.userRepository.findOne({id: id});
    }

    async updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, user);
    }

    async deleteUserById(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async login(usernameOrEmail: string, password: string): Promise<string> {
        const user = await this.validateUser(usernameOrEmail, password);

        if (user)
            return this.authService.generateJWT(user);

        throw new BadRequestException(`Wrong Credentials`);
    }

    async validateUser(emailOrUsername: string, password: string): Promise<UserDto> {
        const user = await this.getUserByUsernameOrEmail(emailOrUsername);

        if (user) {
            const match = await this.authService.comparePasswords(password, user.password);

            if (match) {
                const {password, ...result} = user;
                return result;
            }

            throw new BadRequestException(`Wrong password`);
        }

        throw new BadRequestException(`Wrong email or username`);
    }
}
