//import { PrismaAdapter } from "@next-auth/prisma-adapter";
//import { type GetServerSidePropsContext } from "next";
//import {
//  getServerSession,
//  type DefaultSession,
//  type NextAuthOptions,
//} from "next-auth";
//import DiscordProvider from "next-auth/providers/discord";
//import Google from "next-auth/providers/google";
//import { env } from "~/env.mjs";
//import { db } from "~/server/db";
//
///**
// * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
// * object and keep type safety.
// *
// * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
// */
//declare module "next-auth" {
//  interface Session extends DefaultSession {
//    user: DefaultSession["user"] & {
//      id: string;
//      // ...other properties
//      // role: UserRole;
//    };
//  }
//
//  // interface User {
//  //   // ...other properties
//  //   // role: UserRole;
//  // }
//}
//
///**
// * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
// *
// * @see https://next-auth.js.org/configuration/options
// */
//export const authOptions: NextAuthOptions = {
//  callbacks: {
//    session: ({ session, user }) => ({
//      ...session,
//      user: {
//        ...session.user,
//        id: user.id,
//      },
//    }),
//  },
//  adapter: PrismaAdapter(db),
//  providers: [
//    DiscordProvider({
//      clientId: env.DISCORD_CLIENT_ID,
//      clientSecret: env.DISCORD_CLIENT_SECRET,
//    }),
//    Google({
//      clientId: env.GOOGLE_ID,
//      clientSecret: env.GOOGLE_SECRET,
//    }),
//    /**
//     * ...add more providers here.
//     *
//     * Most other providers require a bit more work than the Discord provider. For example, the
//     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//     *
//     * @see https://next-auth.js.org/providers/github
//     */
//  ],
//};
//
///**
// * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
// *
// * @see https://next-auth.js.org/configuration/nextjs
// */
//export const getServerAuthSession = (ctx: {
//  req: GetServerSidePropsContext["req"];
//  res: GetServerSidePropsContext["res"];
//}) => {
//  return getServerSession(ctx.req, ctx.res, authOptions);
//};
// function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }




import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  User,
  Account,
  Profile,
  Session,
  DefaultUser,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import { AdapterUser } from "next-auth/adapters";

interface CustomUser extends DefaultUser {
  movies: string[];
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: CustomUser & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    /* async session({ session, user }: { session: Session; user: AdapterUser }) {
      session.user.id = user.id;
      session.user.movies = user.movies;
      return session;
    }, */

    /* session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
      async signIn(user: CustomUser, account: Account, profile: Profile) {
        const { email } = user;
  
        // Add a new field to the user object
        user.movies = ['test'];
  
        // Update the user in the database with the new field
        await clientPromise.then(async (client) => {
          const db = client.db();
          const userCollection = db.collection("myFirstDatabase.User");
          await userCollection.updateOne(
            { email: email },
            { $set: { newField: user.movies } },
          );
        });
  
        return true;
      },
    }), */
    /* session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }), */

    async signIn(params) {
      const { email } = params.profile || {}; // Access user's email from the profile

      // Save the list of purchased movie IDs to the user's account in the MongoDB database
      await clientPromise.then(async (client) => {
        const db = client.db();
        const usersCollection = db.collection("User");

        // Check if the user already has a purchasedMovies field
        const userExists = await usersCollection.findOne({ email: email });
        if (!userExists?.purchasedMovies) {
          // If the field doesn't exist, create it with the purchasedMovies array
          await usersCollection.updateOne(
            { email: email },
            { $set: { purchasedMovies: [] } }
          );
        }
      });

      return true;
    },
  },

  adapter: MongoDBAdapter(clientPromise) /* PrismaAdapter(db) */,
  
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
// function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }
