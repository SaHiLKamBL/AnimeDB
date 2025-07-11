// app/SessionWrapper.tsx
'use client';

import { SessionProvider } from 'next-auth/react';

export default function Sessionwrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
