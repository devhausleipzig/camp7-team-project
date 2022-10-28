import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface Props {
  time: string;
}

export default function TimeWidget({ time }: Props) {
  return (
    <div className="flex justify-start items-center gap-1">
      <ClockIcon className="h-6 w-6" />
      <p className="text-xs font-extrabold">{time}</p>
    </div>
  );
}
