import prisma from "@/prisma/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo Electrónico",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "***************",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user) {
          const correctPassword = await bcrypt.compare(
            credentials?.password as string,
            user?.password as string
          );
          if (correctPassword) {
            return { id: user.id, email: user.email, name: user.name };
          } else {
            throw new Error("Contraseña incorrecta");
          }
        }

        throw new Error("El usuario no existe");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
};
