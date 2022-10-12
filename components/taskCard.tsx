import React from "react";
import Image from "next/image";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import ClockIcon from "../public/images/clock.svg";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import CheckBoxCheckedIcon from "../public/images/checkbox-checked.svg";

type taskCardProps = {};



export default function TaskCard({}: taskCardProps) {
  return (
    <div className="flex flex-col rounded-lg h-[29%] w-[88%] bg-white shadow-md p-1 justify-center items-center">
      {/* 1-first div */}
      <div className="flex justify-between p-2 h-[30%] w-11/12 border-b-2 border-black/20">
        {/* counter Component */}
        <div className="text-sm opacity-70">time expression</div>

        <div className="flex text-md gap-1">
          <div className="text-sm">10</div>
          <CoinSelectedIcon className="w-5 h-5" />
        </div>
      </div>
      {/* 2-second div */}
      <div className="flex justify-between p-2 h-[45%] w-11/12 items-center">
        <div className="flex gap-2">
          <div className="flex h-auto w-1 bg-black rounded-full"></div>
          <div className="flex-col">
            {/* Chore Title */}
            <div className="text-xl font-extrabold">Task Title</div>
            {/* max. 32 characters */}
            <div className="text-xs">Task Description</div>
          </div>
        </div>
        {/* && changeable checkbox */}
        <div className="flex">
          <CheckBoxCheckedIcon className="w-5 h-5" />
        </div>
      </div>
      {/* 3-third div */}
      <div className="flex justify-between p-2 h-[22%] w-11/12 items-end">
        <div className="flex justify-center gap-1">
          {/* Calendar. > 24H or Clock-Icon. < 24H */}
          <ClockIcon className="w-5 h-5" />
          {/* time Function Component */}
          <div className="text-sm">time in numbers</div>
        </div>
        <div className="flex w-auto rounded-full border-1 border-black gap-1">
          {/* && changeable Avatar Icon and max. 4 */}
          <User1Icon className="w-5 h-5" />
          <User2Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
