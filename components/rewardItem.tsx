import WideButton from "./WideButton";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function RewardItem() {
	return (
		<div className="bg-white h-34 mt-5 mx-5 px-5 rounded-md flex flex-col">
			<div className="flex flex-row items-center  ">
				<BuildingStorefrontIcon className="text-custom_darkblue h-20 w-20 m-6" />
				<h2 className="text-custom_darkblue text-lg font-semibold pl-4">
					Go shopping
				</h2>
			</div>
			<div>
				<WideButton
					label={"Reward Amount"}
					className="bg-custom_darksage w-72 h-10 rounded-lg text-white text-lg mb-4"
					link={"/"}
				/>
			</div>
		</div>
	);
}
