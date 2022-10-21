import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import CoinSelectedIcon from "../public/images/coin-selected.svg";

type headerProps = {};

export default function Header({}: headerProps) {
  return (
    <div className="h-auto top-0 p-3">
      <div className="flex justify-between items-end">
        <Link href="/">
          <HomeIcon className="h-8 w-8 text-white" />
        </Link>
        <div className="flex items-center text-xl gap-1">
          {/* ${Coins-scoore} */}
          <p className="flex text-2xl text-white">995</p>
          <CoinSelectedIcon className="w-9 h-9" />
        </div>
        <Link href="/avatar">
          <UserCircleIcon className="h-8 w-8 text-white" />
        </Link>
      </div>
    </div>
  );
}
