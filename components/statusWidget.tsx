import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface Props {
	status: boolean;
	requestInProgess: boolean;
	clickHandler: (event: any) => Promise<void>;
}

export default function StatusWidget({
	status,
	requestInProgess,
	clickHandler
}: Props) {
	return (
		<button
			className="h-10 w-10"
			onClick={clickHandler}
			disabled={requestInProgess}
		>
			<CheckCircleIcon
				className={status ? "fill-[#68B684]" : "fill-white"}
			/>
		</button>
	);
}
