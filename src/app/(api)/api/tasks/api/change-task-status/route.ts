import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { status, taskId } = await req.json();

    await prisma.task.update({
      where: { id: taskId },
      data: { completed: status },
    });

    return NextResponse.json(
      { message: "Tarea actualizada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
