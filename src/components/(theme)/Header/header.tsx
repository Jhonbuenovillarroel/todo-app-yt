"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const Header = () => {
  return (
    <header className="py-5 px-6">
      <Button onClick={() => signOut()}>Cerrar sesión</Button>
    </header>
  );
};

export default Header;
