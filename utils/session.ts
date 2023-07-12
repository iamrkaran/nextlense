
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { User } from "next-auth";

interface CustomUser extends User {
  username: string;
  accessToken: string;
  picture: string
}

interface CustomSession extends Session {
  user?: CustomUser;
}

export const getSessionData = async (): Promise<CustomSession | null> => {
  const session = await getSession();
  // console.log(session);
  if (session) {
    return session as CustomSession;
  }
  return null;
};

export const getAccessToken = async (): Promise<string | null> => {
  const session = await getSessionData();
  if (session) {
    return session.user?.accessToken  || null;
  }
  return null;
}

export const getUsername = async (): Promise<string | null> => {
  const session = await getSessionData();
  if (session) {
    return session.user?.username || null;
  }
  return null;
}

export const getPicture = async (): Promise<string | null> => {
  const session = await getSessionData();
  if (session) {
    return session.user?.picture || null;
  }
  return null;
}

export const getUserId = async (): Promise<string | null> => {
  const session = await getSessionData();
  if (session) {
    return session.user?.id || null;
  }
  return null;
}