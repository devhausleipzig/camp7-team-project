import { Task, User } from "@prisma/client";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import task from "../pages/api/task";
import { TaskWithUsers } from "../pages/editTask";
import { CustomEmojiPicker, EmojiUser } from "./customEmojiPicker";

export type TaskWithoutId = Omit<
	Task,
	"id" | "createdAt" | "updatedAt" | "creatorId" | "completed"
> & { assignedTo: EmojiUser[] };

type TaskFormProps = {
	onSubmit: (task: TaskWithoutId) => void;
	buttonText: string;
	updateField: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Task
	) => void;
	userChoices: EmojiUser[];
	task: TaskWithoutId;
	setTask: Dispatch<SetStateAction<TaskWithoutId>>;
	assignedUsers: EmojiUser[];
	setAssignedUsers: Dispatch<SetStateAction<EmojiUser[]>>;
};

// export type TaskFormData = {
// 	title: string;
// 	points: number;
// 	endTime: string;
// 	endDate: string;
// 	note: string;
// 	assignedTo?: EmojiUser[];
// };

export function TaskForm({
	onSubmit,
	buttonText,
	updateField,
	userChoices,
	task,
	setTask,
	assignedUsers,
	setAssignedUsers,
}: TaskFormProps) {
	return (
		<div className="flex flex-col text-custom_darkblue font-bold items-center justify-center">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit({
						...task,
						assignedTo: assignedUsers,
					});
				}}
				className="flex flex-col gap-2 max-w-4xl mx-auto"
			>
				<label htmlFor="title">Task</label>
				<input
					className="border border-neutral-50 border-b-custom_darkblue  text-black"
					value={task.title}
					onChange={(event) => {
						updateField(event, "title");
					}}
					type="text"
					name="title"
					placeholder="Input Task Name Here"
				/>
				<label htmlFor="assignedTo">Members</label>
				<CustomEmojiPicker
					choiceList={userChoices}
					emojis={assignedUsers}
					setEmojis={setAssignedUsers}
				/>
				<label htmlFor="points">Points</label>
				<input
					className="border text-black border-neutral-50 border-b-custom_darkblue"
					value={task.points}
					onChange={(event) => {
						updateField(event, "points");
					}}
					type="number"
					name="points"
					placeholder="enter a number here"
				/>
				<div className="flex gap-2">
					<div className="flex flex-col">
						<label htmlFor="time">End Time</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
							value={task.endTime}
							onChange={(event) => {
								updateField(event, "endTime");
							}}
							type="time"
							name="endTime"
							placeholder="enter a number here"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date">End Date</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
							value={task.endDate}
							onChange={(event) => {
								updateField(event, "endDate");
							}}
							type="date"
							name="endDate"
							placeholder="enter a number here"
						/>
					</div>
				</div>
				<label htmlFor="note">Note</label>
				<textarea
					className="border text-black border-neutral-50 border-b-custom_darkblue"
					rows={2}
					value={task.note}
					onChange={(event) => {
						updateField(event, "note");
					}}
					name="note"
					placeholder="Input note here..."
				></textarea>

				<button className="bg-slate-700 text-slate-50 p-2" type="submit">
					{buttonText}
				</button>
			</form>
		</div>
	);
}
