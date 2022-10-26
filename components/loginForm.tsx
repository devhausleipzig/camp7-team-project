import { useRouter } from "next/router";
import React, { FormEvent } from "react";

export default function LoginForm() {
	const router = useRouter();
	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		router.push("/");
	}

	return (
		<form className="p-8 text-left w-screen" onSubmit={handleSubmit}>
			<label className="form_label">
				Email
				<input
					type="email"
					name="email"
					placeholder="Please enter your email"
					className="form_input"
					size={32}
					required
				/>
			</label>
			<label className="form_label">
				Password
				<input
					type="password"
					name="password"
					placeholder="Please enter your password"
					className="form_input"
					size={32}
					required
				/>
			</label>
			<input
				type="submit"
				value="Log In"
				className="bg-custom_darkblue w-11/12 h-10 rounded-lg text-white text-lg mb-4"
			/>
		</form>
	);
}
