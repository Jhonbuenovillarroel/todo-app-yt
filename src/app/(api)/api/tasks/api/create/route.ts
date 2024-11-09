import prisma from "@/prisma/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, description } = await req.json();
    const session = await getToken({
      secret: process.env.NEXTAUTH_SECRET,
      req,
    });

    await prisma.task.create({
      data: {
        name,
        description,
        userId: session?.sub as string,
      },
    });

    return NextResponse.json(
      { message: "Tarea creada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
