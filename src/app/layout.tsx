import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistMono, geistSans } from "@/fonts/fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Aplicación de gestión de tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <main className="">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
