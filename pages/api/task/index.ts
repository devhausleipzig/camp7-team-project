import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import { User } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const tasks = await prisma.task.findMany({
				where: {
					completed: false
				},
				include: {
					assignedTo: true
				},
				take: 3,
				orderBy: [{ endDate: "asc" }, { endTime: "asc" }]
			});

			res.status(200).json(tasks);
			return;
		}
		if (req.method == methods.post) {
			const taskData = JSON.parse(req.body);
			console.log(taskData);
			const { creatorId } = req.query;
			const task = await prisma.task.create({
				data: {
					...taskData,
					completed: false,
					points: Number(taskData.points),
					createdBy: {
						connect: {
							id: creatorId
						}
					},
					assignedTo: {
						connect: taskData.assignedTo.map((user: User) => {
							return { id: user.id };
						})
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
