import React from "react";
import useProtectedPage from "../hooks/useProtectedPage";
import Header from "../layout/header/header";
import NavigationBar from "../layout/navigationBar/navigationBar";

type tasksProps = {};

export default function Tasks({}: tasksProps) {
	useProtectedPage();

	return (
		<div className="flex flex-col justify-between h-screen gap-24">
			<Header />
			<NavigationBar />
		</div>
	);
}
