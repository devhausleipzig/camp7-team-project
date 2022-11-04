import * as React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import CheckBox from "../../public/images/check-box.svg";

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
			className="h-5 w-5"
			onClick={clickHandler}
			disabled={requestInProgess}
		>
			<CheckBox
				className={
					status
						? "fill-green-700 stroke-white"
						: "fill-white stroke-green-700"
				}
			/>
		</button>
	);
}
