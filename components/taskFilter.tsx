import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import CheckBox from "../public/images/check-box.svg";
import CoinSelectedIcon from "../public/images/coin-selected.svg";

export default function TaskFilter() {
	return (
		<div className="bg-white h-12 mt-5 mx-5 rounded-md">
			<div className="flex justify-around pt-2 ">
				<CoinSelectedIcon className="w-8 h-8" />
				<CheckBox className="w-8 h-8 fill-custom_darksage stroke-white" />
				<CheckBox className="w-8 h-8 fill-white stroke-custom_darksage" />
				<ClockIcon className="w-8 h-8 stroke-custom_darksage" />
				<CalendarIcon
					className="
					w-8
					h-8
					stroke-custom_darksage"
				/>
			</div>
		</div>
	);
}
