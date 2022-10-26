import WideButton from "../components/WideButton";
import RegisterForm from "../components/registerForm";

export default function Register() {
	return (
		<div className="h-screen bg-white font-sans my-5 ml-5 rounded-lg text-center text-custom_darkblue">
			<div>
				<h2 className="text-xl font-bold pt-6">Register</h2>
				<RegisterForm />
			</div>
			<WideButton
				label={"Log In"}
				className="text-custom_lightblue underline underline-offset-2 h-0"
				link={"/login"}
			/>
		</div>
	);
}
