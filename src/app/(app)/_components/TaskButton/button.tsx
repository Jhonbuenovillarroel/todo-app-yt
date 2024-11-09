import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "../TaskForm/form";

const TaskButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex w-fit mx-auto gap-2 items-center">
            <Plus />
            <span>Crear nueva tarea</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crea una nueva tarea</DialogTitle>
            <DialogDescription>
              Puedes especificar el nombre de la tarea y una pequeña descripción
            </DialogDescription>
          </DialogHeader>

          <TaskForm mode="create" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskButton;
