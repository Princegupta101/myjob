import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '@/types';

export const generateToken = (user: User) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET || '', {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || '');
};

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashOtp = async (otp: string) => {
  return await bcrypt.hash(otp, 10);
};

export const verifyOtp = async (otp: string, hashedOtp: string) => {
  return await bcrypt.compare(otp, hashedOtp);
};