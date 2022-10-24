import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, WuiProvider } from "@welcome-ui/core";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WuiProvider theme={theme}>
			<Component {...pageProps} />
		</WuiProvider>
	);
}

export default MyApp;
