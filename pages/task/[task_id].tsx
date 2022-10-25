import { useRouter } from "next/router";
import TaskCard from "../../components/taskCard";
import { useGetTask } from "../../hooks/useGetTask";

export default function TaskPage() {
	const router = useRouter();
	const { task_id } = router.query;
	console.log(task_id);

	////// temporary hack to see how it looks with data
	const { isLoading, task } = useGetTask(task_id as string);
	//////

	return task ? <TaskCard type="extended" task={task} /> : <p>no data</p>;
}
