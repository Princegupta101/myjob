import { NextResponse } from 'next/server';

import { verifyOtp, generateToken } from '@/lib/auth';
import { sendConfirmationEmail } from '@/lib/email';
import clientPromise from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    if (new Date() > new Date(user.otpExpires)) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    const isValid = await verifyOtp(otp, user.otp);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
    await db.collection('users').updateOne(
      { email },
      { 
        $set: { verified: true },
        $unset: { otp: '', otpExpires: '' }
      }
    );

    const result = await sendConfirmationEmail(email);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const token = generateToken({ email });

    const response = NextResponse.json({ token });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, 
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}