import React, { useState } from "react";
import TimeWidget from "./timeWidget";
import DateWidget from "./dateWidget";
import StatusWidget from "./statusWidget";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import User3Icon from "../public/images/user-3.svg";
import User4Icon from "../public/images/user-4.svg";
import User5Icon from "../public/images/user-5.svg";
import Pencil from "../public/images/pencil.svg";
import { methods } from "../utils/methods";
import { Task, User } from "@prisma/client";
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
	task: Task & { assignedTo?: User[] };
};

// points moves down to middle row
// members move up to middle row, switch from flex row to flex column
// add text "Members" above members
// should have both time and date
// status widget moves from middle row to bottom row
// ^ edit button goes where points used to be on top row
// ^ the description has unlimited rows
// ^ takes up full screen height

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
						: "",
					type == "extended"
						? "flex flex-col rounded-lg h-[70%] mx-4 w-auto bg-white shadow-md+ p-1 items-center gap-1"
						: ""
				)}
			>
				{/* 1st card section */}
				<div
					className={clsx(
						"flex justify-between p-2 h-[30%] w-11/12 border-b-2",
						type == "extended"
							? "flex justify-between p-2 h-[9%] w-11/12 border-b-2"
							: ""
					)}
				>
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

					{type == "extended" ? (
						<Pencil className="h-5 w-5" />
					) : (
						<div className="flex text-md gap-1">
							<div className="text-sm font-extrabold">
								{task.points}
							</div>
							<CoinSelectedIcon className="w-5 h-5" />
						</div>
					)}
				</div>
				{/* 2nd card section */}
				<div
					className={clsx(
						"flex justify-between p-2 h-[45%] w-11/12 items-center",
						type == "extended"
							? "flex justify-between p-2 h-[25%] w-11/12 items-center gap-1"
							: ""
					)}
				>
					<div className="flex h-full gap-2">
						<div className="w-1 h-full bg-current rounded-full shrink-0"></div>

						<div className="flex-col w-4/5">
							{/* Chore Title */}
							{type == "preview" && (
								<Link
									href={{
										pathname: "/task/[task_id]",
										query: { task_id: task.id }
									}}
								>
									<a>
										<h2 className="text-xl font-extrabold">
											{task.title}
										</h2>
									</a>
								</Link>
							)}
							{type == "extended" && (
								<h2 className="text-xl font-extrabold">
									{task.title}
								</h2>
							)}
							{/* max. 32 characters */}
							<p
								className={clsx(
									"text-xs shrink",
									type == "preview"
										? "line-clamp-1"
										: type == "overview"
										? "line-clamp-2"
										: type == "extended"
										? "line-clamp-4"
										: ""
								)}
							>
								{task.note}
							</p>
						</div>
					</div>
					{type != "extended" && (
						<div className="flex">
							<StatusWidget
								status={status}
								requestInProgess={requestInProgess}
								clickHandler={statusClickHandler}
							/>
						</div>
					)}
				</div>
				{/* 3rd card section */}
				{type == "extended" && (
					<div className="flex flex-col w-11/12 h-3/6 gap-2">
						<div className="flex w-full justify-end text-md gap-2">
							<div className="text-sm font-extrabold">
								{task.points}
							</div>
							<CoinSelectedIcon className="w-5 h-5" />
						</div>

						<div className="flex flex-col rounded-full border-1 border-black gap-3 self-start">
							{/* max. 5 members */}
							<h3 className="text-xl font-extrabold">Members</h3>
							{task.assignedTo
								? task.assignedTo.map((user, index) => {
										return (
											<div
												key={index}
												className="flex gap-2"
											>
												<img
													className="w-5 h-5 rounded-full"
													src={user.imageUrl}
												></img>
												<p>{user.name}</p>
											</div>
										);
								  })
								: "No members assigned"}
						</div>
					</div>
				)}
				{/* 4rd card section */}
				<div
					className={clsx(
						"flex justify-between p-1 h-[22%] w-11/12 items-end",
						type == "extended" ? "h-[10%]" : ""
					)}
				>
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
							<StatusWidget
								status={status}
								requestInProgess={requestInProgess}
								clickHandler={statusClickHandler}
							/>
						</>
					)}

					{/* map over users assigned to task here && max. 5 members */}
					{type != "extended" && (
						<div className="flex w-auto rounded-full border-1 border-black gap-2">
							{task.assignedTo
								? task.assignedTo.map((user, index) => {
										return (
											<img
												key={index}
												className="w-5 h-5 rounded-full"
												src={user.imageUrl}
											></img>
										);
								  })
								: "No members assigned"}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
