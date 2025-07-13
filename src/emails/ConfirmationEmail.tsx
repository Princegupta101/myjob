
import * as React from 'react';

import { Html, Head, Body, Container, Heading, Text, Preview, Section, Hr } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface ConfirmationEmailProps {
  email: string;
}

export default function ConfirmationEmail({ email }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Account Verification Successful</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container className="bg-white border border-gray-200 my-10 px-10 py-4 rounded-md max-w-[600px]">
            <Heading className="text-2xl font-bold text-primary leading-tight">
              Account Verification Successful
            </Heading>
            <Section>
              <Text className="text-base text-gray-700">Dear User,</Text>
              <Text className="text-base text-gray-700">
                Your account with email <strong>{email}</strong> has been successfully verified!
              </Text>
              <Text className="text-base text-gray-700">
                You can now access your dashboard and explore all features.
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