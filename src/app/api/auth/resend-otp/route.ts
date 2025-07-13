import { NextResponse } from 'next/server';

import { sendOtpEmail } from '@/lib/email';
import { generateOtp, hashOtp } from '@/lib/auth';
import clientPromise from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    await db.collection('users').updateOne(
      { email },
      { $set: { email, otp: hashedOtp, otpExpires, verified: false } },
      { upsert: true }
    );

    const result = await sendOtpEmail(email, otp);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}