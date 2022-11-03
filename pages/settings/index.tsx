import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../layout/header";
import NavigationBar from "../../layout/navigationBar";
import { User } from "@prisma/client";
import Link from "next/link";
import GoTo from "../../public/images/goTo.svg";

type settingsProps = {};

export default function Settings({}: settingsProps) {
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    fetch("http://localhost:3000/api/user", { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const user: User = data[0];
        setUser(user);
      });
  }, []);

  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-screen gap-2">
      <Header />
      <div className="flex flex-col rounded-2xl h-[73%] mx-4 w-auto bg-white shadow-md+ items-center gap-1 text-custom_darkblue text-sm">
        {/* USER NAME */}
        <div className="flex justify-between items-end w-full border-b-2 h-[10%] font-bold">
          <p className="pl-4">{user.name}</p>
        </div>
        {/* ACCOUNT SETTINGS */}
        <div className="flex justify-between items-center w-full h-[10%]">
          <p className="p-4 text-custom_darkblue text-opacity-50">
            Account Settings
          </p>
        </div>
        {/* Edit Profile */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">Edit Profile</p>
          {/* @ts-ignore */}
          <Link href="/settings/edit-profile">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* Change Password */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">Change Password</p>
          {/* @ts-ignore */}
          <Link href="/settings/change-password">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* Edit Team Profile */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">Edit Team Profile</p>
          {/* @ts-ignore */}
          <Link href="/settings/edit-team-profile">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* Push Notifications */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">Push Notifications</p>
        </div>
        {/* Change Theme */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8 border-b-2">
          <p className="p-4">Change Theme</p>
          {/* @ts-ignore */}
          <Link href="/settings/change-theme">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* About us */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">About us</p>
          {/* @ts-ignore */}
          <Link href="/settings/about-us">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* Privacy Policy */}
        <div className="flex justify-between items-center w-full h-[10%] pr-8">
          <p className="p-4">Privacy Policy</p>
          {/* @ts-ignore */}
          <Link href="/settings/privacy-policy">
            <GoTo className="h-3 w-3 text-white" />
          </Link>
        </div>
        {/* <div className="flex justify-start">
          <button
            onClick={() => router.back()}
            className="text-gray-800 outline-none text-sm bg-gray-300"
          >
            {" "}
            back to home
          </button>
        </div> */}
      </div>

      <NavigationBar />
    </div>
  );
}
