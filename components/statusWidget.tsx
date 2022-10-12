import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface Props {
	status: boolean;
}

export function StatusWidget({ status }: Props) {
	return (
		<div>
			{status ? (
				<CheckCircleIcon className="text-[#68B684] h-10 w-10 "></CheckCircleIcon>
			) : (
				<CheckCircleIcon className="text-[#BCD4DE] h-10 w-10 "></CheckCircleIcon>
			)}
		</div>
	);
}
