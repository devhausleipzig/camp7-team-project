import { Task } from "@prisma/client";
import { useEffect, useState } from "react";

import axios from "axios";
import { route } from "nextjs-routes";

export function useGetTodayTasks() {
	const [isLoading, setIsLoading] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		if (!isLoading) {
			axios
				.get(route({ pathname: "/api/task/today" }))
				.then((res) => setTasks(res.data));
		}
	}, [isLoading]);

	return { isLoading, tasks };
}
