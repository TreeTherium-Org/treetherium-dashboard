import NextAuth, { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import EmailProvider from 'next-auth/providers/email'; // Change here
import { auth, db } from '../../../../../firebase'; // Adjust the import based on your project structure

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      // Email provider setup (optional)
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: FirestoreAdapter(db),
  session: {
    // Configure session options here
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.uid = token.uid; // Attach UID to session if needed
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
