import { Sql } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			// const users = await prisma.$queryRaw`
			//     SELECT SUM("task".points) as userPoints
			//     FROM "user"
			//     JOIN "userOnTask" ON "user".id = "userOnTask".userId
			//     JOIN "task" ON "userOnTask".taskId = "task.id"
			//     GROUP BY "user".id
			// `
			res.status(200).end();
			return;
		}

		res.status(500).send({ message: "Unknown request," });
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
