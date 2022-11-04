import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.post) {
			const userData = req.body;

			const user = await prisma.user.create({
				data: {
					...userData,
					password: undefined,
					saltAndHash: await bcrypt.hash(userData.password, 10)
				}
			});

			res.status(201).end();
			return;
		}

		res.status(500).json({ message: "Unknown request." });
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
