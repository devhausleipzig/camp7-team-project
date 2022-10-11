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
		<div>
			<TimeWidget time={time}></TimeWidget>
			<DateWidget date={date}></DateWidget>
			<StatusWidget status={false}></StatusWidget>
		</div>
	);
}
