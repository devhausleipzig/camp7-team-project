import Head from "next/head";
import Header from "../layout/header/header";
import NavigationBar from "../layout/navigationBar/navigationBar";
import TaskCard, { TaskCardTypes } from "../components/taskCard/taskCard";
import { useGetTasks } from "../hooks/useGetTasks";
import useProtectedPage from "../hooks/useProtectedPage";
import { route } from "nextjs-routes";
import Link from "next/link";

export default function Home() {
	const { token } = useProtectedPage();

	if (token) {
		const { isLoading, tasks } = useGetTasks(token);

		return (
			<div className="h-screen">
				<div className="flex flex-col justify-between h-full">
					<Header />
					<Link
						href={{
							pathname: "/task/[task_id]/edit",
							query: {
								task_id: "1f70d68b-c0ee-49a9-a42d-789619af6452",
							},
						}}
					>
						<a>edit</a>
					</Link>
					<div className="flex flex-col w-full px-4 justify-center gap-4">
						{!isLoading &&
							(tasks.length > 0 ? (
								tasks.map((task) => (
									<TaskCard
										type={TaskCardTypes.preview}
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
