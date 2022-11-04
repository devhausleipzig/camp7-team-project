import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import { User } from "@prisma/client";

import jwt from "jsonwebtoken";
import { Payload } from "../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			res.status(401).send("Authorization required.");
			return;
		}

		const decodedToken = jwt.verify(
			token,
			process.env.TOKEN_KEY as string
		) as Payload;

		if (req.method == methods.get) {
			const tasks = await prisma.task.findMany({
				where: {
					assignedTo: { some: { id: decodedToken.user_id } },
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

			const task = await prisma.task.create({
				data: {
					...taskData,
					completed: false,
					points: Number(taskData.points),
					createdBy: {
						connect: {
							id: decodedToken.user_id
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

		res.status(500).json({ message: "Unknown request." });
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			res.status(401).json({ message: "Malformed token." });
			return;
		}

		if (err instanceof jwt.TokenExpiredError) {
			res.status(401).json({ message: "Token expired." });
			return;
		}

		if (err instanceof jwt.NotBeforeError) {
			res.status(401).json({ message: "Token cannot be used yet." });
			return;
		}

		console.log(err);
		res.status(500).end();
	}
};
