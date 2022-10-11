import "../styles/globals.css";
import type { AppProps } from "next/app";

export interface Task {
	id: number;
	title: string;
	points: number;
	endTime: string;
	endDate: string;
	note: string;
}

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
