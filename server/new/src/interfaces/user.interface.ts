import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  isEmailVerified: boolean;
  image: { data: Buffer; contentType: string; name: string };
  passwordChangedAt?: Date;
  lastLogin?: Date;
  failedLoginAttempts: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verifyEmailToken?: string;
  verifyEmailExpires?: Date;
}
