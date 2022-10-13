import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
	status: boolean;
	id: number;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// export function StatusWidget({ status }: Props) {
// 	return (
// 		<div>
// 			{status ? (
// 				<CheckCircleIcon className="text-[#68B684] h-10 w-10 "></CheckCircleIcon>
// 			) : (
// 				<CheckCircleIcon className="text-[#BCD4DE] h-10 w-10 "></CheckCircleIcon>
// 			)}
// 		</div>
// 	);
// }

// let completed = false;

// export function StatusWidget({ status }: Props) {
// 	if (status == false) {
// 		return (
// 			<div>
// 				<CheckCircleIcon className="text-[#BCD4DE] h-10 w-10"></CheckCircleIcon>
// 			</div>
// 		);
// 	}
// 	return (
// 		<div>
// 			<CheckCircleIcon
// 				onClick={handleClick}
// 				className="text-[#68B684] h-10 w-10"
// 			></CheckCircleIcon>
// 		</div>
// 	);
// }

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

// if (status === false) {
// 	return (
// 		<div>
// 			<CheckCircleIcon className="text-[#BCD4DE] h-10 w-10"></CheckCircleIcon>
// 		</div>
// 	);
// }
// return (
// 	<div>
// 		<CheckCircleIcon className="text-[#68B684] h-10 w-10"></CheckCircleIcon>
// 	</div>
// );

// export function StatusWidget({ status }: Props) {
// 	return (
// 		<div>
// 		<CheckCircleIcon onClick={handleClick} className="text-[#68B684] h-10 w-10 ">
// 		</div>
// 	);
// }
