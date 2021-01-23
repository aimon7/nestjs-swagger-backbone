import {
    BadRequestException,
    ConflictException,
    Injectable,
    ServiceUnavailableException,
    UnauthorizedException
} from '@nestjs/common';
import { UserEntity } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './models/user.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './models/user.interface';
import * as nodemailer from 'nodemailer';

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

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email: email});
    }

    async createUser(user: CreateUserDto): Promise<UserDto> {
        const passwordHash = await this.authService.hashPassword(user.password);
        const {...newUser} = user;
        newUser.password = passwordHash;
        newUser.validationString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        let savedUser: UserDto;
        try {
            savedUser = await this.userRepository.save(newUser);
            console.log(`User ${savedUser.username} is saved successfully`)
        } catch (e) {
            throw new ConflictException(`User with the same username or email is already in our database`);
        }

        try {
            await this.sendVerificationEmail(savedUser)
        } catch (e) {
            throw new ServiceUnavailableException(`Mail didn't sent. Please check your settings`);
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
                if (!user.emailValidated)
                    throw new UnauthorizedException(`Validate your email first`);

                const {password, ...result} = user;
                return result;
            }

            throw new BadRequestException(`Wrong password`);
        }

        throw new BadRequestException(`Wrong email or username`);
    }

    async resetPassword(email: string): Promise<boolean | void> {
        const user = await this.getUserByEmail(email);
        if (!user)
            throw new BadRequestException(`No user with email '${email}' in our database`);

        return await this.sendVerificationEmail(user);
    }

    /**
     * Send verification email to a new user
     *
     * @param user
     */
    async sendVerificationEmail(user: User | UserDto): Promise<boolean | void> {
        const url = process.env.EMAIL_URL;

        const link = `${url}account/verify?username=${user.username}&validation=${user.validationString}`;

        const mailOptions = {
            from: process.env.NODEMAILER_AUTH_USER,
            to: user.email,
            subject: 'Please confirm your Email account',
            html:
                `<!DOCTYPE html>
                   <html lang="en">
                    <body>
                    <div>
                   Hello,
                   <br> Please click on the link below to verify your email.
                   <br><a href="${link}">Click here to verify</a>
                   </div>
                   </body></html>`,
        };

        return smtpTransport.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
                if (error) {
                    console.log(`Mail didnt sent with error: ${error.message}`);
                    console.log(error);
                    throw new ServiceUnavailableException(`Email didn't send`);
                }

                console.log(`Mail sent: ${info.messageId}`);
                return true;
            }
        );
    }

    /**
     * Send a reset password email
     *
     * @param user
     */
    async sendResetPasswordEmail(user: User): Promise<boolean | void> {
        // New validationString
        user.validationString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        try {
            await this.userRepository.save(user);
        } catch (e) {
            console.log(`Couldn't save user, because: ${e.message}`);
            console.log(e);
            throw new e;
        }

        const url = process.env.EMAIL_URL;
        const link = `${url}account/recovery?username=${user.username}&validation=${user.validationString}`;

        const mailOptions = {
            from: process.env.NODEMAILER_AUTH_USER,
            to: user.email,
            subject: `Reset your password at <insert here your info>`,
            html:
                `<!DOCTYPE html>
                   <html lang="en">
                    <body>
                    <div>
                    Hello,<br> 
                    Click on the link below to reset your password.<br>
                    <a href = "${link}">Click here</a><br><br>
                    If you didn't request a password reset, please contact <a href = "mailto:${process.env.NODEMAILER_AUTH_USER}">support@profit.com</a>
                   </div>
                   </body></html>`,
        };

        return smtpTransport.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
                if (error) {
                    console.log(`Mail didnt sent with error: ${error.message}`);
                    console.log(error);
                    throw new ServiceUnavailableException(`Email didn't send`);
                }

                console.log(`Mail sent: ${info.messageId}`);
                return true;
            }
        );
    }
}

const smtpTransport = nodemailer.createTransport({
    host: process.env.NODEMAILER_SENDER,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASWORD,
    },
    tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
    }
})