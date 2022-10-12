import React from "react";
import { TimeWidget } from "./timeWidget";
import { DateWidget } from "./dateWidget";
import { StatusWidget } from "./statusWidget";

interface Props {
	date: string;
	time: string;
	// state: boolean
}

export function TaskFooter({ date, time }: Props) {
	return (
		<div className="flex justify-between items-center gap-12 text-[#064789]">
			<TimeWidget time={time}></TimeWidget>
			<DateWidget date={date}></DateWidget>
			<StatusWidget status={true}></StatusWidget>
		</div>
	);
}
