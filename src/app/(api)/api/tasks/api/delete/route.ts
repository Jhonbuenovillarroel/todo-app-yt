import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { taskId } = await req.json();

    await prisma.task.delete({ where: { id: taskId } });
    return NextResponse.json({ message: "Eliminado correctamente" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
