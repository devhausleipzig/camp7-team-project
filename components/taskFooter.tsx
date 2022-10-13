import React from "react";
import { TimeWidget } from "./timeWidget";
import { DateWidget } from "./dateWidget";
import { StatusWidget } from "./statusWidget";
import { Task } from "../pages";

interface Props {
	task: Task;
}

export function TaskFooter({ task }: Props) {
	return (
		<div className="flex justify-between items-center gap-12 text-[#064789]">
			<TimeWidget time={task.endTime}></TimeWidget>
			<DateWidget date={task.endDate}></DateWidget>
			<StatusWidget status={task.status}></StatusWidget>
		</div>
	);
}
