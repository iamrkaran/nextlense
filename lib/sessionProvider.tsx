"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux';
import store from '@/config/store';

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return (
    <Provider store={store}>
    <SessionProvider>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider >
    </SessionProvider>
  </Provider>
  )
}
