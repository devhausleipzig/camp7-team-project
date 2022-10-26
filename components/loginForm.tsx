import WideButton from "./WideButton";

export default function LoginForm() {
	return (
		<form className="p-8 text-left w-screen">
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
		</form>
	);
}
