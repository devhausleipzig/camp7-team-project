import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface Props {
	date: string;
}

export default function DateWidget({ date }: Props) {
	return (
		<div className="flex justify-start items-center">
			<CalendarDaysIcon className="h-6 w-6 mx-2" />
			<p className="text-xs">{date}</p>
		</div>
	);
}
