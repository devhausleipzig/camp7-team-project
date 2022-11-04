import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, {
	createContext,
	SetStateAction,
	Dispatch,
	useEffect
} from "react";
import { useState } from "react";
import { RegisterFormData } from "../components/registerForm";
import { createTheme, WuiProvider } from "@welcome-ui/core";

import { useRouter } from "next/router";
import Head from "next/head";

type user = RegisterFormData;

export const AuthContext = createContext(
	{} as {
		token: string;
		setToken: Dispatch<SetStateAction<string>>;
		user: user;
		setUser: Dispatch<SetStateAction<user>>;
	}
);

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState({} as user);
	const [token, setToken] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.replace({ pathname: "/login" });
		}
	});

	return (
		<>
			<Head>
				<title>Task App</title>
				<meta content="A task management app for families."></meta>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<WuiProvider theme={theme}>
				<AuthContext.Provider
					value={{
						token,
						setToken,
						user,
						setUser
					}}
				>
					<Component {...pageProps} />
				</AuthContext.Provider>
			</WuiProvider>
		</>
	);
}
