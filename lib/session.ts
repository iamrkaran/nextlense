import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import UserModel from "@/models/user";
import connectDB from "@/config/dbConnect";

type User = {
  name: string;
  username: string;
  email: string;
  picture: string;
  createdDate: Date;
  isOAuthUser: boolean;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        await connectDB();

        // Check if user exists in database
        let user = await UserModel.findOne({ email: token.email });
        //create user name from email

        if (!user) {
          // if user not exists then create new user
          let username: string | undefined;
          if (token?.email) {
            const baseUsername = token.email.split("@")[0];
            const randomFourDigits = Math.floor(1000 + Math.random() * 9000);

            username = `${baseUsername}${randomFourDigits}`;
          } else if (token?.name) {
            username = token.name.split(" ")[0];
          }

          user = new UserModel({
            name: token.name,
            username: username || token.name,
            email: token.email,
            picture: token.picture,
            createdDate: new Date(),
            isOAuthUser: true,
          });

          await user.save();
        }
        token.user = {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          username: user.username,
          accessToken: token.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};

export default NextAuth(authOptions);
