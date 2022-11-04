import React from "react";
import LoginImg from "../src/images/login.png";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import WideButton from "../components/button/button";

export default function Login() {
	return (
		<div className=" bg-white font-sans m-4 rounded-lg">
			<div className="text-center pt-14">
				{/* <CheckCircleIcon className="text-[#68B684] h-48 mx-auto" /> */}
				<div>
					<img
						src={LoginImg.src}
						alt="login image"
						className="text-[#68B684] h-48 mx-auto"
					/>
				</div>
				<div className="text-custom_darkblue mt-10">
					<h1 className="text-3xl font-bold">Fancy an ice cream?</h1>
					<h1 className="text-3xl font-bold">
						Just fold the laundry.
					</h1>
					<p className="mt-5 mx-5 pb-6 ">
						Now, this is a story all about how My life got
						flipped-turned upside down And I'd like to take a minute
						Just sit right there I'll tell you how I became the
						prince of a town called Bel-Air
					</p>
					<WideButton
						label={"Log In"}
						className="bg-custom_darkblue"
						link={"/login"}
					/>
					<WideButton
						label={"Register"}
						className="bg-custom_darksage"
						link={"/register"}
					/>
				</div>
			</div>
		</div>
	);
}
