import { Task } from "@prisma/client";

export type TaskWithoutId = Omit<Task, "id" | "createdAt" | "updatedAt">;

interface Props {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
	task: Task | TaskWithoutId;
	buttonText: string;
	updateField: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof Task
	) => void;
}

export function TaskForm({ onSubmit, task, updateField, buttonText }: Props) {
	return (
		<div className="flex flex-col text-custom_darkblue font-bold items-center justify-center">
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-2 max-w-4xl mx-auto"
			>
				<label htmlFor="task-title">Task</label>
				<input
					className="border border-neutral-50 border-b-custom_darkblue  text-black"
					type="text"
					id="task-title"
					value={task.title}
					placeholder="Input Task Name Here"
					onChange={(event) => updateField(event, "title")}
				/>
				<label htmlFor="points">Points</label>
				<input
					className="border text-black border-neutral-50 border-b-custom_darkblue"
					type="number"
					id="points"
					value={task.points}
					placeholder="enter a number here"
					onChange={(event) => updateField(event, "points")}
				/>
				<div className="flex gap-2">
					<div className="flex flex-col">
						<label htmlFor="time">End Time</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
							type="time"
							id="time"
							value={task.endTime}
							placeholder="enter a number here"
							onChange={(event) => updateField(event, "endTime")}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="date">End Date</label>
						<input
							className="border text-black border-neutral-50 border-b-custom_darkblue"
							type="date"
							id="date"
							value={task.endDate}
							placeholder="enter a number here"
							onChange={(event) => updateField(event, "endDate")}
						/>
					</div>
				</div>
				<label htmlFor="note">Note</label>
				<textarea
					className="border text-black border-neutral-50 border-b-custom_darkblue"
					rows={2}
					id="note"
					placeholder="Input note here..."
					value={task.note}
					onChange={(event) => updateField(event, "note")}
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
