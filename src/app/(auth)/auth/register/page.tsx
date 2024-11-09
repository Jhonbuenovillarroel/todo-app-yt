import React from "react";
import AuthForm from "../_components/AuthForm/form";

const Page = () => {
  return (
    <section className="w-full flex items-center justify-center min-h-screen py-8">
      <AuthForm mode="register" />
    </section>
  );
};

export default Page;
