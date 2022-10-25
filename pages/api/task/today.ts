import { NextApiRequest, NextApiResponse } from "next";
import { format, addDays } from "date-fns";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const tasks = await prisma.task.findMany({
				where: {
					completed: false,
					endDate: {
						lte: format(addDays(new Date(), 1), "yyyy-MM-dd")
					}
				},
				take: 3,
				orderBy: [{ endDate: "asc" }, { endTime: "asc" }]
			});
			res.status(200).json(tasks);
			return;
		}

		res.status(500).send("unknown request");
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
