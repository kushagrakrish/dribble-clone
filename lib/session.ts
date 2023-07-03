import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

// import { createUser, getUser } from "./actions";
// import { SessionInterface, UserProfile } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //   jwt: {
  //     encode: ({ secret, token }) => {},
  //     decode: async ({ secret, token }) => {},
  //   },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // get user if exist
        // if they dont exist ,create them
        // return true if  they exist pr were created

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};
