import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
	status: boolean;
	id: number;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function StatusWidget({ status, id, isLoading, setIsLoading }: Props) {
	const handleClick = async () => {
		setIsLoading(true);
		await fetch(`http://localhost:3004/tasks/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: !status,
			}),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
		setIsLoading(false);
	};

	return (
		<button className="h-10 w-10" onClick={handleClick} disabled={isLoading}>
			<CheckCircleIcon
				className={status ? "text-[#68B684]" : "text-[#BCD4DE]"}
			/>
		</button>
	);
}
