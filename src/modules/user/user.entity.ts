import {
  BaseEntity, BeforeInsert,
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
  @IsInt()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column()
  password: string;

  @IsString()
  @Column()
  salt: string;

  @IsString()
  @IsOptional()
  @Column()
  firstName: string;

  @IsString()
  @IsOptional()
  @Column()
  lastName: string;

  @IsEmail()
  @Column()
  email: string;

  @IsBoolean()
  @Column({default: false})
  emailValidated: boolean;

  @IsBoolean()
  @Column({default: false})
  isAdmin: boolean;

  @CreateDateColumn()
  @Column()
  createdAt: Date;

  @UpdateDateColumn()
  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  @Column()
  deletedAt: Date;

  @BeforeInsert()
  protected async beforeInsert(): Promise<boolean> {
    const errors: ValidationError[] = await validate(this)
    if(errors.length){
      throw new BadRequestException((errors));
    }

    return true;
  }

  async validatePassword(password: string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}