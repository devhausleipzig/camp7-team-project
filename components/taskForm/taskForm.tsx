import { Task, User } from "@prisma/client";
import { useState } from "react";
import {
	CustomEmojiPicker,
	EmojiUser
} from "../customEmojiPicker/customEmojiPicker";

export type TaskWithoutId = Omit<
	Task,
	"id" | "createdAt" | "updatedAt" | "creatorId"
> & { assignedTo: User[] };

type TaskFormProps = {
	onSubmit: (formData: TaskFormData) => Promise<void>;
	buttonText: string;
	userChoices: EmojiUser[];
};

export type TaskFormData = {
	title: string;
	points: number;
	endTime: string;
	endDate: string;
	note: string;
	assignedTo?: EmojiUser[];
};

export function TaskForm({ onSubmit, buttonText, userChoices }: TaskFormProps) {
	const [assignedUsers, setAssignedUsers] = useState<EmojiUser[]>([]);

	return (
		<div className="flex flex-col text-custom_darkblue font-bold items-center justify-center">
			<form
				onSubmit={(event) => {
					// prevent default behavior of browser for a form submission event
					event.preventDefault();

					// get data from the form html element
					const formData = new FormData(
						event.target as HTMLFormElement
					);
					const formDataObj = Object.fromEntries(
						formData.entries()
					) as unknown as TaskFormData;

					// reset form input fields
					const formElement = event.target as HTMLFormElement;
					formElement.reset();
					setAssignedUsers([]);

					// manually add data from custom input component to form data
					formDataObj["assignedTo"] = assignedUsers;
					console.log(formDataObj);
					onSubmit(formDataObj);
				}}
				className="flex flex-col gap-2 max-w-4xl mx-auto"
			>
				<label htmlFor="title">Task</label>
				<input
					className="border border-neutral-50 border-b-custom_darkblue  text-black"
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
					type="number"
					name="points"
					placeholder="enter a number here"
				/>
				<div className="flex gap-2">
					<div className="flex flex-col">
						<label htmlFor="time">End Time</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
							type="time"
							name="endTime"
							placeholder="enter a number here"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date">End Date</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
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
					name="note"
					placeholder="Input note here..."
				></textarea>

				<button
					className="bg-slate-700 text-slate-50 p-2"
					type="submit"
				>
					{buttonText}
				</button>
			</form>
		</div>
	);
}
