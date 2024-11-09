import React from "react";
import TaskList from "../_components/TaskList/TaskList";
import TaskButton from "../_components/TaskButton/button";
import { getAllTasksByUser } from "@/prisma/dbqueries/tasks/get-all-by-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(api)/api/auth/[...nextauth]/authOptions";

const getData = async (userId: string) => {
  const tasks = await getAllTasksByUser(userId);
  return tasks;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user.id as string);

  return (
    <section className="flex flex-col gap-5 w-full  justify-center py-8">
      <TaskButton />
      <TaskList tasks={data} />
    </section>
  );
};

export default Page;
