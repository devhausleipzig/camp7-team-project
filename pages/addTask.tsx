import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { format } from "date-fns";
import { methods } from "../utils/methods";
import { Task, User } from "@prisma/client";
import { useGetUsers } from "../hooks/useGetUsers";
import { EmojiUser } from "../components/customEmojiPicker/customEmojiPicker";
import Header from "../layout/header/header";
import NavigationBar from "../layout/navigationBar/navigationBar";
import { TaskForm, TaskWithoutId } from "../components/taskForm/taskForm";
import useProtectedPage from "../hooks/useProtectedPage";

type addTaskProps = {};

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
	const { token } = useProtectedPage();

	if (token) {
		const { users } = useGetUsers();
		const [task, setTask] = useState<TaskWithUsers>({ ...initialTask });
		const [emojiUsers, setEmojiUsers] = useState<EmojiUser[]>([]);
		const [assignedUsers, setAssignedUsers] = useState<EmojiUser[]>([]);

		useEffect(() => {
			// translate user into EmojiUsers in order to satisfy the emojiPicker library used inside the taskForm component
			setEmojiUsers(
				users.map((user) => {
					return {
						alias: user.id as string,
						url: user.imageUrl as string,
					};
				})
			);
		}, [users]);

		async function handleSubmit() {
			// translate EmojiUsers back to Users for database
			const taskWithoutEmoji = task as unknown as Task & { assignedTo: User[] };
			taskWithoutEmoji.assignedTo = task.assignedTo
				? task.assignedTo.map((emojiUser) => {
						return users.find((user) => {
							return user.id == emojiUser.alias.replace(":", "");
						}) as User;
				  })
				: [];

			try {
				alert("Your task got created");
				fetch(`http://localhost:3000/api/task`, {
					method: methods.post,
					body: JSON.stringify(task),
					headers: { Authorization: token },
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
							assignedUsers={assignedUsers}
							setAssignedUsers={setAssignedUsers}
						/>
					</div>
				</div>
				<NavigationBar />
			</div>
		);
	}
}
