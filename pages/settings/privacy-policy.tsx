import { User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import Header from "../../layout/header";
import NavigationBar from "../../layout/navigationBar";

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen gap-2">
      <Header />
      <div className="flex flex-col rounded-2xl h-[73%] mx-4 w-auto bg-white shadow-md+ items-center gap-1 text-custom_darkblue text-sm"></div>
      <NavigationBar />
    </div>
  );
}
