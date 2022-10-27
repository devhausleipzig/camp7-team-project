import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const users = await prisma.user.findMany();
			res.status(200).json(users);
			return;
		}

		res.status(500).send("unknown request");
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
