import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          // Security: Never use RegExp with user input — prevents NoSQL injection.
          // An attacker could send identifier=".*" to match any account.
          const identifier = credentials.identifier?.trim().toLowerCase();
          if (!identifier) {
            throw new Error('Email or username is required');
          }
          const user = await UserModel.findOne({
            $or: [
              { email: identifier },
              { username: identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password!
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            // Create a unique username from the Google name
            const baseName = (user.name || 'user')
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '')
              .slice(0, 15);
            let username = baseName;
            let suffix = 1;

            // Ensure username is unique
            while (await UserModel.findOne({ username })) {
              username = `${baseName}${suffix}`;
              suffix++;
            }

            await UserModel.create({
              username,
              email: user.email,
              isVerified: true,
              isAcceptingMessages: true,
              provider: 'google',
              messages: [],
            });
          } else if (!existingUser.isVerified) {
            // Auto-verify if they sign in with Google
            existingUser.isVerified = true;
            existingUser.provider = existingUser.provider || 'google';
            await existingUser.save();
          }
          return true;
        } catch (error) {
          console.error('Error during Google sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user) {
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: user.email });
        if (dbUser) {
          token._id = dbUser._id?.toString();
          token.isVerified = dbUser.isVerified;
          token.isAcceptingMessages = dbUser.isAcceptingMessages;
          token.username = dbUser.username;
          token.isPro = dbUser.isPro;
        }
      } else if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
        token.isPro = user.isPro;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
        session.user.isPro = token.isPro;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
