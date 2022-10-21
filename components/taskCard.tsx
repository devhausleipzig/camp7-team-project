import React from "react";
import { Task } from "../pages";
import TimeWidget from "./timeWidget";
import DateWidget from "./dateWidget";
import StatusWidget from "./statusWidget";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import DeadlineWidget from "./deadlineWidget";

type taskCardProps = {
	task: Task;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskCard({
	task,
	isLoading,
	setIsLoading
}: taskCardProps) {
	// temp

	//

	return (
		<>
			<div className="flex flex-col rounded-lg h-full bg-white shadow-md+ p-1 justify-center items-center">
				{/* 1-first div header */}
				<div className="flex justify-between p-2 h-[30%] w-11/12 border-b-2 border-black/20">
					{/* counter Component */}
					<DeadlineWidget task={task} />

					<div className="flex text-md gap-1">
						<div className="text-sm">{task.points}</div>
						<CoinSelectedIcon className="w-5 h-5" />
					</div>
				</div>
				{/* 2-second div main */}
				<div className="flex justify-between p-2 h-[45%] w-11/12 items-center">
					<div className="flex h-full gap-2">
						<div className="w-1 h-full bg-black rounded-full"></div>
						<div className="flex-col">
							{/* Chore Title */}
							<div className="text-xl font-extrabold">
								{task.title}
							</div>
							{/* max. 32 characters */}
							<div className="text-xs">{task.note}</div>
						</div>
					</div>
					<div className="flex">
						<StatusWidget
							status={task.status}
							id={task.id}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					</div>
				</div>
				<div className="flex justify-between p-2 h-[22%] w-11/12 items-end">
					<TimeWidget time={task.endTime} />
					<DateWidget date={task.endDate} />

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
