import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import Header from "../../../layout/header/header";
import NavigationBar from "../../../layout/navigationBar/navigationBar";
import { methods } from "../../../utils/methods";
import { Task, User } from "@prisma/client";
import { useGetUsers } from "../../../hooks/useGetUsers";
import { EmojiUser } from "../../../components/customEmojiPicker/customEmojiPicker";
import { AuthContext } from "../../_app";
import useProtectedPage from "../../../hooks/useProtectedPage";
import { route } from "nextjs-routes";
import { useRouter } from "next/router";
import { useGetTask } from "../../../hooks/useGetTask";
import { TaskForm } from "../../../components/taskForm/taskForm";

type editTaskProps = {};

export default function EditTask({}: editTaskProps) {
	const { token } = useProtectedPage();
	if (token) {
		const { users } = useGetUsers();

		const router = useRouter();
		const { task_id } = router.query;
		const [task, setTask] = useState<Task & { assignedTo: EmojiUser[] }>();
		const [assignedUsers, setAssignedUsers] = useState<EmojiUser[]>([]);
		const { isLoading, task: oldTask } = useGetTask(task_id as string);

		useEffect(() => {
			if (!isLoading) {
				setTask(oldTask);
			}
		}, [oldTask]);

		const [emojiUsers, setEmojiUsers] = useState<EmojiUser[]>([]);

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
			const taskWithoutEmoji = task as unknown as Task & {
				assignedTo: User[];
			};
			taskWithoutEmoji.assignedTo =
				task && task.assignedTo
					? task.assignedTo.map((emojiUser) => {
							return users.find((user) => {
								return user.id == emojiUser.alias.replace(":", "");
							}) as User;
					  })
					: [];
			try {
				alert("Task updated");
				const taskData = task as Task & { assignedTo: EmojiUser[] };
				fetch(
					route({
						pathname: "/api/task/[task_id]",
						query: {
							task_id: taskData.id,
						},
					}),
					{
						method: methods.put,
						body: JSON.stringify(task),
						headers: { Authorization: token },
					}
				);
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
							oldTask={task}
							setTask={setTask}
							buttonText="Update"
							assignedUsers={assignedUsers}
							setAssignedUsers={setAssignedUsers}
						/>
					</div>
				</div>
				<NavigationBar />
			</div>
		);
	} else {
		return <p>Redirecting...</p>;
	}
}
