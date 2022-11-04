import React from "react";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import TaskFilter from "../components/taskFilter";

type tasksProps = {};

export default function Tasks({}: tasksProps) {
	return (
		<div className="h-screen">
			<div className="flex flex-col align-start">
				<Header />
			</div>
			<div>
				<TaskFilter />
			</div>
			<div className="flex flex-col mt-[460px]">
				<NavigationBar />
			</div>
		</div>
	);
}
