import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import RewardItem from "./rewardItem";

export default function RewardShop() {
	return (
		<div>
			<div className="bg-white h-12 mt-5 mx-5 px-5 py-2 rounded-md flex justify-between">
				<h2 className="text-custom_darkblue text-2xl font-bold">
					Rewards Shop
				</h2>
				<PencilIcon className="h-8 w-8 text-custom_darksage" />
				<PlusIcon className="h-8 w-8 text-custom_darksage" />
			</div>
			<div className="overflow-scroll">
				<RewardItem />
				<RewardItem />
				<RewardItem />
			</div>
		</div>
	);
}
