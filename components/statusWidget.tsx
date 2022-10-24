import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface Props {
	status: boolean;
	isLoading: boolean;
	clickHandler: (event: any) => Promise<void>;
}

export default function StatusWidget({
	status,
	isLoading,
	clickHandler
}: Props) {
	return (
		<button
			className="h-10 w-10"
			onClick={clickHandler}
			disabled={isLoading}
		>
			<CheckCircleIcon
				className={status ? "fill-[#68B684]" : "fill-[#BCD4DE]"}
			/>
		</button>
	);
}
