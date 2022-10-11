import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface Props {
	time: string;
}

export function TimeWidget({ time }: Props) {
	return (
		<div className="flex justify-start">
			<ClockIcon className="h-10 w-10 mx-2" />
			<h6>{time}</h6>
		</div>
	);
}
