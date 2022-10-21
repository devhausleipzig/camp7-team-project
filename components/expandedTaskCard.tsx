import React from "react";
import Image from "next/image";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import ClockIcon from "../public/images/clock.svg";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import CheckBoxCheckedIcon from "../public/images/checkbox-checked.svg";

type expandedTaskCardProps = {};

export default function ExpandedTaskCard({}: expandedTaskCardProps) {
  return (
    <div className="flex flex-col rounded-lg h-[29%] w-[88%] bg-white shadow-md p-1 justify-center items-center">
      <div></div>
    </div>
  );
}
