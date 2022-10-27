import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import axios from "axios";
import { route } from "nextjs-routes";

export function useGetUsers() {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		if (!isLoading) {
			axios
				.get(route({ pathname: "/api/user" }))
				.then((res) => setUsers(res.data));
		}
	}, [isLoading]);

	return { isLoading, users };
}
