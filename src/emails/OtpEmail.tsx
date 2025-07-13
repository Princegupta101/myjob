import * as React from 'react';

import { Html, Head, Body, Container, Heading, Text, Preview, Section, Hr } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface OtpEmailProps {
  otp: string;
}

export default function OtpEmail({ otp }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP Code for myjobb AI</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container className="bg-white border border-gray-200 my-10 px-10 py-4 rounded-md max-w-[600px]">
            <Heading className="text-2xl font-bold text-primary leading-tight">
              Your OTP Code
            </Heading>
            <Section>
              <Text className="text-base text-gray-700">Dear User,</Text>
              <Text className="text-base text-gray-700">
                Your One-Time Password (OTP) for verification is:
              </Text>
              <Text className="text-2xl font-bold text-secondary text-center my-5">
                {otp}
              </Text>
              <Text className="text-base text-gray-700">
                This OTP is valid for 10 minutes. Please do not share it with anyone.
              </Text>
              <Hr className="my-4 border-gray-300" />
              <Text className="text-base text-gray-700">
                Thank you,
                <br />
                myjobb AI Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}