import React from "react";
import { TaskFooter } from "./taskFooter";

type taskCardProps = {};

export default function TaskCard({}: taskCardProps) {
	return (
		<>
			<div className="flex justify-center align-middle text-xl">
				<TaskFooter date="22.10." time="5 pm"></TaskFooter>
			</div>
		</>
		// <div className="flex flex-col rounded-md h-[250px] w-[400px] bg-slate-500">
		//   <div className="flex"></div>
		//   <div className="flex"></div>
		//   <div className="flex"></div>
		// </div>
	);
}
