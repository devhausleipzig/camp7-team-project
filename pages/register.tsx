import WideButton from "../components/button/button";
import RegisterForm, { RegisterFormData } from "../components/registerForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./_app";

export default function Register() {
	const { setUser } = useContext(AuthContext);
	const [formData, setFormData] = useState({} as RegisterFormData);

	useEffect(() => {
		setUser(formData);
	}, [formData]);

	return (
		<div className="h-screen bg-white font-sans my-5 ml-5 rounded-lg text-center text-custom_darkblue">
			<div>
				<h2 className="text-xl font-bold pt-6">Register</h2>
				<RegisterForm saveData={setFormData} />
			</div>
			<WideButton
				label={"Log In"}
				className="text-custom_lightblue underline underline-offset-2 h-0"
				link={"/login"}
			/>
		</div>
	);
}
