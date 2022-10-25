import React from "react";
import TimeWidget from "./timeWidget";
import DateWidget from "./dateWidget";
import StatusWidget from "./statusWidget";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import User1Icon from "../public/images/user-1.svg"
import User2Icon from "../public/images/user-1.svg";
import { methods } from "../utils/methods";
import { Task } from "@prisma/client";

import clsx from "clsx";
import { ta } from "date-fns/locale";
import TaskCard, { checkDeadline } from "./taskCard";
import { type } from "os";
import { text } from "stream/consumers";
import task from "../pages/api/task";

type expandedTaskCardProps = {
  type: "preview" | "overview" | "extended";
  task: Task;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ExpandedTaskCard({
  type,
  task,
  isLoading,
  setIsLoading,
}: expandedTaskCardProps) {
  const { unit, text } = checkDeadline(task.endDate, task.endTime);
  //
  //
  const statusClickHandler = async (event: Event) => {
    setIsLoading(true);
    await fetch(
      `http://localhost:3000/task/${task.id}/completed?completed=${String(
        !task.completed
      )}`,
      { method: methods.patch }
    ).then((res) => res.json());
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col rounded-lg h-full w-full bg-white shadow-md+ p-1 justify-center items-center">
        {/* 1-first div header */}
        <div className="flex justify-between p-2 h-[85%] w-11/12 border-b-2 border-current">
          {/* counter Component */}
          <p className="text-sm">{text}</p>
          <div className="text-xl font-extrabold">{task.title}</div>

          <div className="flex text-md gap-1">
            <div className="text-sm">{task.points}</div>
            <CoinSelectedIcon className="w-5 h-5" />
          </div>
        </div>
        {/* 2-second div main */}
        <div className="flex justify-between p-2 h-[45%] w-11/12 items-center">
          <div className="flex h-full gap-2">
            {(type == "preview" || type == "overview") && (
              <div className="w-1 h-full bg-current rounded-full"></div>
            )}
            <div className="flex-col">
              {/* Chore Title */}
              {type == "preview" && (
                <div className="text-xl font-extrabold">{task.title}</div>
              )}
              {/* max. 32 characters */}
              <div
                className={clsx(
                  "text-xs",
                  type == "preview"
                    ? "line-clamp-1"
                    : type == "overview"
                    ? "line-clamp-2"
                    : ""
                )}
              >
                {task.note}
              </div>
            </div>
          </div>
          <div className="flex">
            <StatusWidget
              status={task.completed}
              isLoading={isLoading}
              clickHandler={statusClickHandler}
            />
          </div>
        </div>
        <div className="flex justify-between p-2 h-[22%] w-11/12 items-end">
          {type == "preview" ? (
            unit == "hour" || unit == "minute" ? (
              <TimeWidget time={task.endTime} />
            ) : (
              <DateWidget date={task.endDate} />
            )
          ) : (
            <>
              <TimeWidget time={task.endTime} />
              <DateWidget date={task.endDate} />
            </>
          )}

          {/* map over users assigned to task here */}
          <div className="flex w-auto rounded-full border-1 border-black gap-1">
            <User1Icon className="w-5 h-5" />
            <User2Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
}
