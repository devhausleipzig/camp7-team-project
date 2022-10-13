import React from "react";
import { Task } from "../pages";
import { TimeWidget } from "./timeWidget";
import { DateWidget } from "./dateWidget";
import { StatusWidget } from "./statusWidget";

type taskCardProps = {
	task: Task;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskCard({
	task,
	isLoading,
	setIsLoading,
}: taskCardProps) {
	return (
		<>
			<div className="flex justify-center align-middle text-xl">
				<div className="flex justify-between items-center gap-12 text-[#064789]">
					<TimeWidget time={task.endTime} />
					<DateWidget date={task.endDate} />
					<StatusWidget
						status={task.status}
						id={task.id}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
		</>
		// <div className="flex flex-col rounded-md h-[250px] w-[400px] bg-slate-500">
		//   <div className="flex"></div>
		//   <div className="flex"></div>
		//   <div className="flex"></div>
		// </div>
	);
}
