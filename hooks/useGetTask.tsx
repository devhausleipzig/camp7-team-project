import { Task } from "@prisma/client";
import { useEffect, useState } from "react";

import axios from "axios";
import { route } from "nextjs-routes";

export function useGetTask(task_id: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [task, setTask] = useState<Task>();

	useEffect(() => {
		if (!isLoading) {
			axios
				.get(
					route({
						pathname: "/api/task/[task_id]",
						query: { task_id: task_id }
					})
				)
				.then((res) => setTask(res.data));
		}
	}, [isLoading]);

	return { isLoading, task };
}
