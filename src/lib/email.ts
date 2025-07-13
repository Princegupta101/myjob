import { Resend } from 'resend';

import { render } from '@react-email/render';
import ConfirmationEmail from '@/emails/ConfirmationEmail';
import OtpEmail from '@/emails/OtpEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const html = await render(OtpEmail({ otp }), { pretty: true });
    const data = await resend.emails.send({
      from: 'myjobb AI <onboarding@resend.dev>',
      to: email,
      subject: 'Your OTP Code',
      html,
    });
    return { data };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'Failed to send OTP email' };
  }
};

export const sendConfirmationEmail = async (email: string) => {
  try {
    const html = await render(ConfirmationEmail({ email }), { pretty: true });
    const data = await resend.emails.send({
      from: 'myjobb AI <onboarding@resend.dev>',
      to: email,
      subject: 'Account Verification Successful',
      html,
    });
    return { data };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'Failed to send confirmation email' };
  }
};