import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface Props {
	date: string;
}

export function DateWidget({ date }: Props) {
	return (
		<div className="flex justify-start items-center">
			<CalendarDaysIcon className="h-10 w-10 mx-2" />
			<h6>{date}</h6>
		</div>
	);
}
