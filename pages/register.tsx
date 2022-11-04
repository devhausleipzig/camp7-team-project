import Button, { ButtonSizes } from "../components/button/button";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "./_app";
import { useRouter } from "next/router";
import { route } from "nextjs-routes";
import { methods } from "../utils/methods";

export type RegisterFormData = {
	name: string;
	email: string;
	confirmEmail?: string;
	password: string;
};

export default function Register() {
	const [formData, setFormData] = useState({} as RegisterFormData);

	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [emailsSame, setEmailsSame] = useState(true);
	const [isValidEmail, setIsValidEmail] = useState(true);

	const router = useRouter();

	function emailEventHandler(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setEmail(() => value); // setEmail(value);
	}

	function confirmEmailEventHandler(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const value = event.target.value;
		setConfirmEmail(() => value);
	}

	function emailsSameEventHandler() {
		let equal = email === confirmEmail;
		setEmailsSame(() => equal); //sets boolean
	}

	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	function validEmail() {
		setIsValidEmail(emailRegex.test(email));
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const target = event.currentTarget as HTMLFormElement;

		const formData = new FormData(target);
		const formDataObj = Object.fromEntries(
			formData.entries()
		) as RegisterFormData;

		delete formDataObj["confirmEmail"];

		const response = await fetch(
			route({ pathname: "/api/auth/register" }),
			{
				method: methods.post,
				body: JSON.stringify(formDataObj)
			}
		);

		if (response.status != 201) {
			// request unsuccessful
		} else {
			target.reset();
			router.push({ pathname: "/login" });
		}
	}

	return (
		<div className="h-screen bg-white font-sans my-5 ml-5 rounded-lg text-center text-custom_darkblue">
			<div>
				<h2 className="text-xl font-bold pt-6">Register</h2>
				<form
					className="p-8 text-left w-screen"
					onSubmit={handleSubmit}
				>
					<label className="form_label">
						Name
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							className="form_input"
							size={32}
							required
						/>
					</label>
					<label className="form_label">
						Email
						<input
							type="email"
							name="email"
							placeholder="Please enter your email"
							className={`${
								isValidEmail ? "form_input" : "form_input_wrong"
							}`}
							size={32}
							onChange={emailEventHandler}
							onBlur={validEmail}
							required
						/>
					</label>
					<label className="form_label">
						Confirm Email
						<input
							type="email"
							name="confirmEmail"
							placeholder="Please re-enter your email"
							className={`${
								emailsSame ? "form_input" : "form_input_wrong"
							} ${
								email == "" || !isValidEmail
									? "form_disabled"
									: ""
							}`}
							size={32}
							onChange={confirmEmailEventHandler}
							onBlur={emailsSameEventHandler}
							disabled={email == "" || !isValidEmail}
							required
						/>
					</label>
					<label className="form_label">
						Password
						<input
							type="password"
							name="password"
							placeholder="max. 8 characters (A-Z a-z 0-9 !@#$%)"
							className="form_input"
							size={32}
							required
						/>
					</label>
					<input
						type="submit"
						value="Register"
						className="bg-custom_darkblue w-11/12 h-10 rounded-lg text-white text-lg mb-4"
					/>
				</form>
			</div>
			<Button
				label={"Log In"}
				link={"/login"}
				size={ButtonSizes.default}
			/>
		</div>
	);
}
