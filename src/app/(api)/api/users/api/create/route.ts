import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { name, username, email, password } = await req.json();

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    const emailExists = await prisma.user.findUnique({ where: { email } });

    if (usernameExists) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    } else if (emailExists) {
      return NextResponse.json(
        { error: "El correo ya existe" },
        { status: 400 }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: passwordHashed,
      },
    });

    return NextResponse.json(
      { message: "Usuario registrado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
