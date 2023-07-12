"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return <SessionProvider>
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider >
  </SessionProvider>;
}
