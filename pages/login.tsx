import WideButton from "../components/button/button";
// import LoginImg from "../../src/images/login.png";
import LoginForm from "../components/loginForm";

export default function Login() {
	return (
		<div className="h-screen bg-white font-sans my-5 ml-5 rounded-lg text-center text-custom_darkblue">
			<div className="pt-14">
				{/* <img
					src={LoginImg.src}
					alt="login image"
					className="text-[#68B684] h-48 mx-auto"
				/> */}
				<h1 className="text-3xl font-bold">Almost there...</h1>
				<LoginForm />
			</div>
			<WideButton
				label={"Register"}
				className="text-custom_lightblue underline underline-offset-2 h-0"
				link={"/register"}
			/>
		</div>
	);
}
