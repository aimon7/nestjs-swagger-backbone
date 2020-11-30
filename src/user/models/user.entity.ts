import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from './user.interface';

@Entity()
@Unique(['username', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    name: 'first_name',
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: true,
  })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'email_validated',
    type: 'boolean',
    default: false,
  })
  emailValidated: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column({
    name: 'profile_image',
    nullable: true
  })
  profileImage: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  @BeforeInsert()
  protected async beforeInsert(): Promise<boolean> {
    const errors: ValidationError[] = await validate(this);
    if (errors.length) {
      throw new BadRequestException((errors));
    }

    return true;
  }
}
