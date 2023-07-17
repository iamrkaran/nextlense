"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux';
import store from '@/config/store';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider attribute="class">
          <ToastContainer />
          {children}
        </ThemeProvider >
      </SessionProvider>
    </Provider>
  )
}
