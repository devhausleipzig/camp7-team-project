import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TaskWithoutID } from "../components/taskForm";

export function usePostTask() {
	const { query } = useRouter();
	const [post, setTask] = useState<TaskWithoutID | null>(null);

	useEffect(() => {
		fetch(`http://localhost:3000/tasks/${query.id}`)
			.then((res) => res.json())
			.then((res) => setTask(res));
	}, []);

	return { post, id: query.id };
}
