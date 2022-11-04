import React from "react";
import RewardShop from "../components/rewardShop";
import Header from "../layout/header";
import NavigationBar from "../layout/navigationBar";

type rewardsProps = {};

export default function Rewards({}: rewardsProps) {
	return (
		<div className="h-screen">
			<div className="flex flex-col align-start">
				<Header />
			</div>
			<div>
				<RewardShop />
			</div>
			<div className="flex flex-col mt-[256px] fixed">
				<NavigationBar />
			</div>
		</div>
	);
}
