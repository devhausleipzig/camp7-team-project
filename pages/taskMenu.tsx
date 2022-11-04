import React from "react";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import TaskFilter from "../components/taskFilter";
type tasksProps = {};

export default function Tasks({}: tasksProps) {
	return (
		<div className="flex flex-col justify-between h-screen gap-24">
			<Header />
			<NavigationBar />
		</div>
	);
}
