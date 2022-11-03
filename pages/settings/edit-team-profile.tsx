import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../layout/header";
import NavigationBar from "../../layout/navigationBar";

type editTeamProfileProps = {};

export default function EditTeamProfile({}: editTeamProfileProps) {
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
      <div className="flex flex-col rounded-2xl h-[73%] mx-4 w-auto bg-white shadow-md+ items-center gap-1 text-custom_darkblue text-sm"></div>
      <NavigationBar />
    </div>
  );
}
