

// import NextAuth, { NextAuthOptions, Account, Profile } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import GoogleProvider from 'next-auth/providers/google';
// import UserModel from '@/models/user';
// import connectDB from '@/config/dbConnect';
// import Cookies from 'js-cookie';

// type User = {
//   name: string;
//   username: string;
//   email: string;
//   picture: string;
//   createdDate: Date;
//   isOAuthUser: boolean;
// };

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//   ],
//   secret: process.env.SECRET,
//   callbacks: {
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         await connectDB();
//         let user = await UserModel.findOne({ email: token.email });

//         if (!user) {
//           let username: string | undefined;
//           if (token?.email) {
//             const baseUsername = token.email.split('@')[0];
//             const randomFourDigits = Math.floor(1000 + Math.random() * 9000);

//             username = `${baseUsername}${randomFourDigits}`;
//           } else if (token?.name) {
//             username = token.name.split(' ')[0];
//           }

//           user = new UserModel({
//             name: token.name,
//             username: username || token.name,
//             email: token.email,
//             picture: token.picture,
//             createdDate: new Date(),
//             isOAuthUser: true,
//           });

//           await user.save();
//         }

//         const authToken = token.accessToken;

        
//         if (authToken) {
         
//           console.log(authToken);
        
//           Cookies.set('token', authToken as string, { expires: 1 * 24 * 60 * 60 });
//           // Set the value of the 'token' cookie to the value of the 'authToken' variable.
//           // The 'expires' property specifies that the cookie will be stored for 24 hours.
//         }
//         token.user = {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           picture: user.picture,
//           username: user.username,
//           accessToken: token.accessToken,
//         };

//         console.log(token);
//         Cookies.set('token', token.accessToken as string);
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user as User;
//       return session;
//     },
//     async signIn({ account }) {
//       if (account?.access_token) {
//         return true;
//       }
//       return true; // Sign-in process should continue
//     },
//   },
// };

// export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions, Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import UserModel from '@/models/user';
import connectDB from '@/config/dbConnect';
import Cookies from 'js-cookie';

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
        let user = await UserModel.findOne({ email: token.email });

        if (!user) {
          let username: string | undefined;
          if (token?.email) {
            const baseUsername = token.email.split('@')[0];
            const randomFourDigits = Math.floor(1000 + Math.random() * 9000);

            username = `${baseUsername}${randomFourDigits}`;
          } else if (token?.name) {
            username = token.name.split(' ')[0];
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

        const authToken = token.accessToken;

        if (authToken) {
          Cookies.set('token', authToken as string, { expires: 1 * 24 * 60 * 60 });
        }
        token.user = {
          id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          username: user.username,
          accessToken: token.accessToken,
        };

        console.log(token);
        // The `token` cookie will be stored for 24 hours.
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
    async signIn({ account }) {
      if (account?.access_token) {
        return true;
      }
      return true; // Sign-in process should continue
    },
  },
};

export default NextAuth(authOptions);
