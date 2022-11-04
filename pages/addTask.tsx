import React, {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useState
} from "react";
import { TaskWithoutId, TaskForm, TaskFormData } from "../components/taskForm";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";
import { format } from "date-fns";
import { methods } from "../utils/methods";
import { Task, User } from "@prisma/client";
import { useGetUsers } from "../hooks/useGetUsers";
import { EmojiUser } from "../components/customEmojiPicker";
import { AuthContext } from "./_app";

type addTaskProps = {};

export default function AddTask({}: addTaskProps) {
	const { users } = useGetUsers();

	const { user, token } = useContext(AuthContext);

	const [emojiUsers, setEmojiUsers] = useState<EmojiUser[]>([]);

	useEffect(() => {
		// translate user into EmojiUsers in order to satisfy the emojiPicker library used inside the taskForm component
		setEmojiUsers(
			users.map((user) => {
				return {
					alias: user.id as string,
					url: user.imageUrl as string
				};
			})
		);
	}, [users]);

	async function handleSubmit(formData: TaskFormData) {
		// translate EmojiUsers back to Users for database
		const task = formData as unknown as Task & { assignedTo: User[] };
		task.assignedTo = formData.assignedTo
			? formData.assignedTo.map((emojiUser) => {
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
				headers: { Authorization: token }
			});
		} catch (err) {
			console.log(err);
		}
	}

	return token ? (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<div className="flex justify-center">
				<div className="flex flex-col justify-center rounded-lg h-[430px] w-[300px] bg-white shadow-md+ p-1">
					<TaskForm
						onSubmit={handleSubmit}
						userChoices={emojiUsers}
						buttonText="Save"
					/>
				</div>
			</div>
			<NavigationBar />
		</div>
	) : (
		<p>Redirecting...</p>
	);
}
