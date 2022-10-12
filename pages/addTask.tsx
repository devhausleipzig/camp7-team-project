import React, { ChangeEvent, FormEvent, useState } from "react";
import { TaskForm } from "../components/PostTask";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import { Task } from "./_app";
import { format } from "date-fns";

type addTaskProps = {};

const initialTask = {
	title: "",
	points: 0,
	endTime: format(new Date(), "HH:mm"),
	endDate: format(new Date(), "yyyy-MM-dd"),
	note: "",
};

export default function AddTask({}: addTaskProps) {
	const [task, setTask] = useState(initialTask);

	function updateField(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Task
	) {
		setTask({ ...task, [field]: event.target.value });
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const response = await fetch("http://localhost:3004/tasks", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(task),
			});
			if (!response.ok) throw new Error();
			alert("Your task got created");
			setTask(initialTask);
		} catch (err) {
			alert("something went wrong");
		}
	}

	return (
		<div className="flex flex-col justify-between h-screen gap-24">
			<Header />
			<TaskForm
				onSubmit={handleSubmit}
				task={task}
				updateField={updateField}
				buttonText="Save"
			/>
			<NavigationBar />
		</div>
	);
}
