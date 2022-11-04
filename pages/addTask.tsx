import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TaskWithoutId, TaskForm } from "../components/taskForm";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import { format } from "date-fns";
import { methods } from "../utils/methods";
import { Task, User } from "@prisma/client";
import { useGetUsers } from "../hooks/useGetUsers";
import { EmojiUser } from "../components/customEmojiPicker";

type addTaskProps = {};

/////
///// hard-code user ID; temp solution for testing
const creatorId = "48c079fd-457f-4e1f-8aa8-caa8a37dd4bf";
/////
/////

type TaskWithUsers = TaskWithoutId;

const current = new Date();

const initialTask: TaskWithUsers = {
	title: "",
	assignedTo: [],
	endTime: format(current, "HH:mm"),
	endDate: format(current, "yyyy-MM-dd"),
	points: 0,
	note: "",
};

export default function AddTask({}: addTaskProps) {
	const { users } = useGetUsers();
	const [task, setTask] = useState<TaskWithUsers>({ ...initialTask });
	const [emojiUsers, setEmojiUsers] = useState<EmojiUser[]>([]);
	const [assignedUsers, setAssignedUsers] = useState<EmojiUser[]>([]);

	useEffect(() => {
		// translate user into EmojiUsers in order to satisfy the emojiPicker library used inside the taskForm component
		setEmojiUsers(
			users.map((user) => {
				return {
					alias: user.id,
					url: user.imageUrl,
				};
			})
		);
	}, [users]);

	function handleSubmit(task: TaskWithoutId) {
		// translate EmojiUsers back to Users for database

		const assignedUsers = task.assignedTo.map((emojiUser) => {
			return users.find((user) => {
				return user.id == emojiUser.alias.replace(":", "");
			}) as User;
		});

		try {
			alert("Your task got created");
			fetch(`http://localhost:3000/api/task?creatorId=${creatorId}`, {
				method: methods.post,
				body: JSON.stringify({
					...task,
					assignedTo: assignedUsers,
				}),
			}).then(() => {
				setTask({ ...initialTask });
			});
		} catch (err) {
			console.log(err);
		}
	}

	function updateField(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Task
	) {
		if (!task) return;
		setTask({ ...task, [field]: event.target.value });
	}

	return (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<div className="flex justify-center">
				<div className="flex flex-col justify-center rounded-lg h-[430px] w-[300px] bg-white shadow-md+ p-1">
					<TaskForm
						onSubmit={handleSubmit}
						updateField={updateField}
						userChoices={emojiUsers}
						task={task}
						setTask={setTask}
						buttonText="Save"
					/>
				</div>
			</div>
			<NavigationBar />
		</div>
	);
}
