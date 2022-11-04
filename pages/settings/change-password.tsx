import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../layout/header";
import NavigationBar from "../../layout/navigationBar";
import User1 from "../../public/images/user-1.svg";
import { useGetUsers } from "../../hooks/useGetUsers";
import { Prisma } from "@prisma/client";

export type EditUserName = Omit<string, "name">;

interface editProfileProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  name: EditUserName;
  buttonText: string;
  updateField: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof EditUserName
  ) => void;
}

// type UserName = Name & {beforEdit: string[]}

export default function EditProfile({}: editProfileProps) {
  const { users } = useGetUsers();
  const [name, setName] = useState({} as User);
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
      <div className="flex flex-col rounded-2xl h-[73%] mx-4 w-auto bg-white shadow-md+ items-center py-6 gap-1 text-custom_darkblue text-">
        {/* INFOS SECTION */}
        <div className="flex-col h-[70%] w-11/12 gap-3">
          <p className="text-custom_darkblue text-opacity-50 text-sm">
            {" "}
            Change Password
          </p>
          <div className="pb-7">
            <p className="pb-2">Name</p>
            <input
              className="border-custom_darkblue border-b-2"
              type="text"
              name="user.name"
              value={user.name}
              placeholder="John Doe"
              onChange={(event) => updateField(event, "name")}
            />
          </div>
          <div className="pb-3">
            <p className="pb-3">E-Mail</p>
            <input
              className="border-custom_darkblue border-b-2"
              type="text"
              name="E-Mail"
              value={user.email}
              placeholder="example@cxn.org"
              onChange={(event) => updateField(event, "email")}
            />
          </div>
          <p className="text-lg py-8">Logout</p>
        </div>
        {/* BOTTUNS SECTION */}
        <div className="flex h-1/4 w-11/12 justify-center items-end">
          <button className="bg-blue-300 text-lg h-2/5 w-2/5 rounded-l-2xl border border-custom_darkblue shadow-md">
            Save
          </button>
          <button
            onClick={() => router.back()}
            className=" text-gray-800 text-lg outline-none bg-white h-2/5 w-2/5 rounded-r-2xl border border-custom_darkblue shadow-md"
          >
            {" "}
            Cancel
          </button>
        </div>
      </div>
      <NavigationBar />
    </div>
  );
}
function updateField(event: ChangeEvent<HTMLInputElement>, arg1: string): void {
  throw new Error("Function not implemented.");
}
