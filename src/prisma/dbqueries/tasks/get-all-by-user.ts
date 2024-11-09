import prisma from "@/prisma/prisma";

export const getAllTasksByUser = async (userId: string) => {
  const tasks = await prisma.task.findMany({ where: { userId } });
  return tasks;
};
