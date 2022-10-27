import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { createContext, SetStateAction, Dispatch } from "react";
import { useState } from "react";
import { RegisterFormData } from "../components/registerForm";
import { createTheme, WuiProvider } from "@welcome-ui/core";

type user = RegisterFormData;

export const authContext = createContext(
	{} as { user: user; setUser: Dispatch<SetStateAction<user>> }
);

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState({} as user);
	return (
		<WuiProvider theme={theme}>
			<authContext.Provider
				value={{
					user,
					setUser,
				}}
			>
				<Component {...pageProps} />
			</authContext.Provider>
		</WuiProvider>
	);
}

export default MyApp;
