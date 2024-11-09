"use client";

import React from "react";
import styles from "./checkbox.module.css";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  taskId: string;
  checked: boolean;
}

const TaskCheckBox = ({ taskId, checked }: Props) => {
  const router = useRouter();

  return (
    <>
      <div className={`${styles["checkbox-wrapper"]}`}>
        <input
          id={taskId}
          onChange={() => {}}
          checked={checked}
          onClick={async () => {
            try {
              const response = await axios.post(
                "/api/tasks/api/change-task-status",
                { status: !checked, taskId }
              );

              toast({
                title: response.data.message,
                description: new Date().toLocaleString(),
              });

              router.refresh();
            } catch (error) {
              console.log(error);
              toast({
                title: "Error interno del servidor",
                description: "Inténtalo de nuevo más tarde",
                variant: "destructive",
              });
            }
          }}
          type="checkbox"
        />
        <label htmlFor={taskId}>
          <div className={`${styles["tick_mark"]}`}></div>
        </label>
      </div>
    </>
  );
};

export default TaskCheckBox;
