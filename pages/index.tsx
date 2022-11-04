import Head from "next/head";
import Header from "../layout/header/header";
import NavigationBar from "../layout/navigationBar/navigationBar";
import TaskCard from "../components/taskCard/taskCard";
import { useContext } from "react";
import { AuthContext } from "./_app";
import { useGetTasks } from "../hooks/useGetTasks";

export default function Home() {
	const { user, token } = useContext(AuthContext);

	if (token) {
		const { isLoading, tasks } = useGetTasks(token);

		return (
			<div className="h-screen">
				<div className="flex flex-col justify-between h-full">
					<Header />
					<div className="flex flex-col w-full px-4 justify-center gap-4">
						{!isLoading &&
							(tasks.length > 0 ? (
								tasks.map((task) => (
									<TaskCard
										type="preview"
										task={task}
										key={task.id}
									></TaskCard>
								))
							) : (
								<p>No more tasks for today</p>
							))}
					</div>
					<NavigationBar />
				</div>
			</div>
		);
	} else {
		return <p>Redirecting...</p>;
	}
}
