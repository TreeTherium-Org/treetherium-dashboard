import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import EmailProvider from 'next-auth/providers/email'; // Ensure correct import
import { auth, db } from '../../../../../firebase'; // Adjust import if necessary
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: FirestoreAdapter(db), // Make sure db is of the correct type
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) { // Check if session.user is defined
        session.user.uid = token.uid; // Attach UID to session if needed
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.uid = user.uid; // Store UID in token for session use
      }
      return token;
    },
  },
};
