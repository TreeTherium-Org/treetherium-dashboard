import NextAuth, { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import EmailProvider from 'next-auth/providers/email';
import { auth, db } from '../../../../../firebase'; // Adjust the import based on your project structure

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: FirestoreAdapter(db), // Ensure `db` is correctly typed as Firestore
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.uid = token.uid; // Attach UID to session if needed
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid; // Store UID in token for session use
      }
      return token;
    },
  },
};
