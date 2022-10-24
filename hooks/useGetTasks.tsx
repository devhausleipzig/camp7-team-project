import { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import { methods } from "../utils/methods";

import axios from "axios";

export function useGetTasks() {
	const [isLoading, setIsLoading] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		if (!isLoading) {
			axios
				.get("http://localhost:3000/api/task")
				.then((res) => setTasks(res.data));
		}
	}, [isLoading]);

	return { isLoading, setIsLoading, tasks, setTasks };
}
