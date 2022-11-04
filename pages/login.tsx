import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import Button, { ButtonSizes } from "../components/button/button";
// import LoginImg from "../../src/images/login.png";
import { methods } from "../utils/methods";
import { AuthContext } from "./_app";

export default function Login() {
	const context = useContext(AuthContext);
	const router = useRouter();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const loginResponse = await fetch(
			"http://localhost:3000/api/auth/login",
			{
				method: methods.post,
				body: JSON.stringify({
					email: "test@test.com",
					password: "password"
				})
			}
		);

		if (loginResponse.status != 200) {
			// not logged in
		}

		const loginBody = await loginResponse.json();
		const token = loginBody.token;

		const userResponse = await fetch("http://localhost:3000/api/user/me", {
			method: methods.get,
			headers: { Authorization: token }
		});

		const userBody = await userResponse.json();

		context.setUser(userBody);
		context.setToken(token);
		router.push({ pathname: "/" });
	}

	return (
		<div className="h-screen bg-white font-sans my-5 ml-5 rounded-lg text-center text-custom_darkblue">
			<div className="pt-14">
				{/* <img
					src={LoginImg.src}
					alt="login image"
					className="text-[#68B684] h-48 mx-auto"
				/> */}
				<h1 className="text-3xl font-bold">Almost there...</h1>
				<form
					className="p-8 text-left w-screen"
					onSubmit={handleSubmit}
				>
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
			</div>
			<Button
				label={"Register"}
				link={"/register"}
				size={ButtonSizes.default}
			/>
		</div>
	);
}
