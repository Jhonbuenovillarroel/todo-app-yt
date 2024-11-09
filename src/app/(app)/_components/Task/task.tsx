"use client";

import { Task as TaskType } from "@prisma/client";
import React from "react";
import TaskCheckBox from "../TaskCheckbox/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "../TaskForm/form";

interface Props {
  task: TaskType;
}

const Task = ({ task }: Props) => {
  const router = useRouter();

  return (
    <div className="px-8 flex justify-between items-center w-full h-28 rounded-md border border-zinc-200">
      <div
        className="flex gap-4 items-center
      "
      >
        <TaskCheckBox taskId={task.id} checked={task.completed} />
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{task.name}</h3>
          <p className="text-zinc-500">{task.description}</p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <Dialog>
          <DialogTrigger>
            <Pencil className="w-[18px] h-[18px]" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edita la tarea</DialogTitle>
              <DialogDescription>
                Puedes modificar el nombre de la tarea y una pequeña descripción
              </DialogDescription>
            </DialogHeader>

            <TaskForm mode="edit" task={task} />
          </DialogContent>
        </Dialog>
        <div
          className="cursor-pointer text-red-500"
          title="Eliminar"
          onClick={async () => {
            try {
              const response = await axios.post("/api/tasks/api/delete", {
                taskId: task.id,
              });

              toast({
                title: response.data.message,
                description: new Date().toLocaleString(),
              });

              router.refresh();
            } catch (error) {
              console.log(error);
              toast({
                title: "Error interno del servidor",
                description: "Intentalo de nuevo más tarde",
              });
            }
          }}
        >
          <Trash2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Task;
