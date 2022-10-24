import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.patch) {
			const { completed, taskId } = req.query;
			console.log("query obj: ", completed, taskId);

			await prisma.task.update({
				where: {
					id: taskId as string
				},
				data: {
					completed:
						completed === "true"
							? true
							: completed == "false"
							? false
							: undefined
				}
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
