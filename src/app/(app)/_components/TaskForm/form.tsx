"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Task as TaskType } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo Obligatorio" }),
  description: z.string(),
});

interface Props {
  mode: "create" | "edit";
  task?: TaskType;
}

const TaskForm = ({ mode, task }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mode === "create" ? "" : task?.name,
      description: mode === "create" ? "" : task?.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (mode === "create") {
        const response = await axios.post("/api/tasks/api/create", values);

        toast({
          title: response.data.message,
          description: new Date().toLocaleString(),
        });

        router.refresh();
        form.reset();
      } else {
        const response = await axios.post("/api/tasks/api/edit", {
          ...values,
          taskId: task?.id,
        });

        toast({
          title: response.data.message,
          description: new Date().toLocaleString(),
        });

        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error interno del servidor",
        description: "Inténtalo de nuevo o inténtalo más tarde",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ej. Estudiar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ej. Tomar apuntes y estudiar por 3 horas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            text={mode === "create" ? "Crear" : "Guardar cambios"}
            loadingText={
              mode === "create" ? "Creando..." : "Guardando cambios..."
            }
          />
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
