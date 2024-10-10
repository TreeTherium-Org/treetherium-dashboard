import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.email === "admin@admin.com" &&
          credentials.password === "admin"
        ) {
          return { id: "1", name: "admin" };
        }

        return null;
      },
    }),
  ],
};

export default auth;
