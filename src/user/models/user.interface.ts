export interface User {
  id: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailValidated: boolean;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum UserRole {
  SUPERADMIN = 'super-admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user'
}