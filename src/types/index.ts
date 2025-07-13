export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

export interface User {
  email: string;
  otp?: string;
  otpExpires?: Date;
  verified?: boolean;
}