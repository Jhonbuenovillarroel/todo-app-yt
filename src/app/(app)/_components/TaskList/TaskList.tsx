import React from "react";
import Task from "../Task/task";
import { Task as TaskType } from "@prisma/client";

interface Props {
  tasks: TaskType[];
}

const TaskList = ({ tasks }: Props) => {
  return (
    <div className="flex w-full items-center justify-center flex-col">
      <h2 className="text-3xl font-medium">Tareas del día</h2>

      <div className="flex w-full max-w-[600px] justify-center flex-col items-center gap-4 mt-8">
        {!!tasks.length ? (
          <>
            {tasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </>
        ) : (
          <div>Aún no se ha creado ninguna tarea</div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
