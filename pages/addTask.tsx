import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TaskWithoutId, TaskForm } from "../components/taskForm";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import { format } from "date-fns";
import { methods } from "../utils/methods";
import { Task } from "@prisma/client";

type addTaskProps = {};

const initialTask: TaskWithoutId = {
	title: "",
	points: 0,
	endTime: format(new Date(), "HH:mm"),
	endDate: format(new Date(), "yyyy-MM-dd"),
	note: "",
	completed: false
};

export default function AddTask({}: addTaskProps) {
	const [task, setTask] = useState<Task | TaskWithoutId>(initialTask);

	function updateField(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Task
	) {
		setTask((task) => {
			return {
				...task,
				[field]: event.target.value
			};
		});
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			alert("Your task got created");
			fetch(`http://localhost:3000/api/task`, {
				method: methods.post,
				body: JSON.stringify(task)
			});
			setTask(initialTask);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<div className="flex justify-center">
				<div className="flex flex-col justify-center rounded-lg h-[430px] w-[300px] bg-white shadow-md+ p-1">
					<TaskForm
						onSubmit={handleSubmit}
						task={task}
						updateField={updateField}
						buttonText="Save"
					/>
				</div>
			</div>
			<NavigationBar />
		</div>
	);
}
