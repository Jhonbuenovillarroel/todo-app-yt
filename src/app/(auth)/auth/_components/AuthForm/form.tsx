"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import FormUploadButton from "@/components/(theme)/FormUploadButton/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo Obligatorio" }),
  username: z.string().min(1, { message: "Campo Obligatorio" }),
  email: z
    .string()
    .min(1, { message: "Campo Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z
    .string()
    .min(7, { message: "Debe tener 7 caracteres como mínimo" }),
});

interface Props {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: mode === "login" ? "a" : "",
      username: mode === "login" ? "a" : "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (mode === "login") {
        const response = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (response?.ok) {
          toast({
            title: "Inicio de sesión exitoso",
            description: "Redirigiendo...",
          });

          setTimeout(() => {
            router.push("/app");
          }, 1500);
        } else {
          toast({
            title: response?.error as string,
            description: new Date().toLocaleString(),
            variant: "destructive",
          });
        }
      } else {
        const response = await axios.post("/api/users/api/create", values);

        toast({
          title: response.data.message,
          description: new Date().toLocaleString(),
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.error) {
          toast({
            title: error.response?.data.error,
            description: new Date().toLocaleString(),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error interno del servidor",
            description: new Date().toLocaleString(),
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[300px] flex flex-col gap-6 px-6 py-7 rounded-md border border-zinc-200">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          {mode === "register" && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="johndoe123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="*********************"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormUploadButton
            isSubmitting={form.formState.isSubmitting}
            text={mode === "login" ? "Iniciar sesión" : "Registrarse"}
            loadingText={
              mode === "login" ? "Iniciando sesión..." : "Registrando..."
            }
          />
        </form>
      </Form>

      <div className="flex flex-col gap-3 items-center text-sm">
        <p className="font-semibold hover:underline">
          <Link href={`/auth/login`}>Olvidé mi contraseña</Link>
        </p>

        {mode === "login" ? (
          <p className="text-center">
            Aún no tienes una cuenta?{" "}
            <Link
              href={`/auth/register`}
              className="font-semibold hover:underline"
            >
              Registrate
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Ya tienes una cuenta?{" "}
            <Link
              href={`/auth/login`}
              className="font-semibold hover:underline"
            >
              Inicia Sesión
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
