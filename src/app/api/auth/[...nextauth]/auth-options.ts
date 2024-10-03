import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter'; // Correct import here
import Providers from 'next-auth/providers';
import { auth, db } from '../../../../../firebase'; // Adjust the import based on your project structure

export const authOptions = {
  providers: [
    // Add your providers here (e.g., Google, Facebook, etc.)
    Providers.Email({
      // Email provider setup (optional)
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: FirestoreAdapter(db), // Use FirestoreAdapter instead of FirebaseAdapter
  session: {
    // Configure session options here
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // Attach the user object to the session
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
