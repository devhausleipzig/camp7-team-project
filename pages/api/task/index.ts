import { NextApiRequest, NextApiResponse } from "next";
import { format, addDays } from "date-fns";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.post) {
			const taskData = JSON.parse(req.body);
			const { creatorId } = req.query;
			const task = await prisma.task.create({
				data: {
					...taskData,
					points: Number(taskData.points),
					createdBy: {
						connect: {
							id: creatorId
						}
					}
				}
			});

			res.status(201).json({ id: task.id });
			return;
		}

		res.status(500).send("unknown request");
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
