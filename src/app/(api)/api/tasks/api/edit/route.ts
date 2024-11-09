import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, description, taskId } = await req.json();

    await prisma.task.update({
      where: { id: taskId },
      data: {
        name,
        description,
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
