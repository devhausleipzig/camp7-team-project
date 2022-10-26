import React, { useState } from "react";
import WideButton from "./WideButton";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [emailsSame, setEmailsSame] = useState(true);

	function emailEventHandler(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setEmail(() => value); // setEmail(value);
		console.log(value);
	}

	function confirmEmailEventHandler(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const value = event.target.value;
		setConfirmEmail(() => value);
		console.log(value);
	}

	function emailsSameEventHandler() {
		let equal = email === confirmEmail;
		console.log(equal, email, confirmEmail);
		setEmailsSame(() => equal); //sets boolean
	}

	return (
		<form className="p-8 text-left w-screen">
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
					className="form_input"
					size={32}
					onChange={emailEventHandler}
					required
				/>
			</label>
			<label className="form_label">
				Confirm Email
				<input
					type="email"
					name="confirmEmail"
					placeholder="Please re-enter your email"
					className={`${emailsSame ? "form_input" : "form_input_wrong"}`}
					size={32}
					onChange={confirmEmailEventHandler}
					onBlur={emailsSameEventHandler}
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
		</form>
	);
}
