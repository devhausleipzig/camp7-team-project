import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface Props {
  date: string;
}

export default function DateWidget({ date }: Props) {
  return (
    <div className="flex justify-start items-center gap-1">
      <CalendarDaysIcon className="h-6 w-6" />
      <p className="text-xs font-extrabold">{date}</p>
    </div>
  );
}
