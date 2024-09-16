import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan, type Session, type User } from "lucia";
import { db } from "./db";
import { env } from "@/env";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "harja_auth",
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(1, "w"),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      email: attributes.email,
      picture: attributes.picture,
      bio: attributes.bio,
      isAdmin: attributes.isAdmin,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  bio: string | null;
  isAdmin: boolean;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (error) {
      console.log(error);
    }

    return result;
  },
);
