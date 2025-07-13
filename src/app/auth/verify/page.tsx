import { Suspense } from 'react';

import VerifyClient from './VerifyClient';

export default function Verify() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>}>
      <VerifyClient />
    </Suspense>
  );
}