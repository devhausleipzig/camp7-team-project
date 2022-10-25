import React, { useState } from "react";
import TimeWidget from "./timeWidget";
import DateWidget from "./dateWidget";
import StatusWidget from "./statusWidget";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import { methods } from "../utils/methods";
import { Task } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { route } from "nextjs-routes";

export function checkDeadline(endDate: string, endTime: string) {
	let unit: "day" | "hour" | "minute" | null;
	const now = new Date();
	const endTDate = new Date(endDate + "T" + endTime);
	const diffInMinutes = Math.trunc(
		(endTDate.valueOf() - now.valueOf()) / 60 / 1000
	);
	const diffInHours = Math.trunc(diffInMinutes / 60);
	const diffInDays = Math.trunc(diffInHours / 24);
	let diffString = "";

	if (diffInDays > 0) {
		unit = "day";
		diffString = `less than ${diffInDays} days`;
	} else if (diffInHours > 0) {
		unit = "hour";
		diffString = `less than ${diffInHours} hours`;
	} else if (diffInMinutes > 0) {
		unit = "minute";
		diffString = `less than ${diffInMinutes} minutes`;
	} else {
		unit = null;
		diffString = "deadline passed";
	}
	return { unit, text: diffString };
}

type taskCardProps = {
	type: "preview" | "overview" | "extended";
	task: Task;
};

export default function TaskCard({ type, task }: taskCardProps) {
	const [status, setStatus] = useState<boolean>(task.completed);
	const [requestInProgess, setRequestInProgess] = useState<boolean>(false);

	const { unit, text } = checkDeadline(task.endDate, task.endTime);

	const statusClickHandler = async (event: Event) => {
		setRequestInProgess(true);
		await fetch(
			route({
				pathname: "/api/task/[task_id]/completed",
				query: { task_id: task.id, completed: String(!status) }
			}),
			{ method: methods.patch }
		);
		setStatus((status) => !status);
		setRequestInProgess(false);
		console.log(requestInProgess);
	};

	return (
		<>
			<div
				className={clsx(
					"flex flex-col rounded-lg h-full w-full bg-white shadow-md+ p-1 justify-center items-center",
					unit == null
						? "text-custom_red"
						: unit == "minute"
						? "text-custom_orange"
						: unit == "hour"
						? "text-yellow-500"
						: unit == "day"
						? "text-custom_darkblue"
						: ""
				)}
			>
				{/* 1-first div header */}
				<div className="flex justify-between p-2 h-[30%] w-11/12 border-b-2 border-current">
					{/* counter Component */}
					{type == "preview" || type == "extended" ? (
						<p className="text-sm">{text}</p>
					) : (
						<Link
							href={{
								pathname: "/task/[task_id]",
								query: { task_id: task.id }
							}}
						>
							<a>
								<div className="text-xl font-extrabold">
									{task.title}
								</div>
							</a>
						</Link>
					)}

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
								<Link
									href={{
										pathname: "/task/[task_id]",
										query: { task_id: task.id }
									}}
								>
									<a>
										<div className="text-xl font-extrabold">
											{task.title}
										</div>
									</a>
								</Link>
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
							status={status}
							requestInProgess={requestInProgess}
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
