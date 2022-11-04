import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

import jwt from "jsonwebtoken";
import { Payload } from "../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const token = req.headers.authorization;

			if (!token) {
				res.status(401).json({ message: "Authorization required." });
				return;
			}

			const decodedToken = jwt.verify(
				token,
				process.env.TOKEN_KEY as string
			) as Payload;

			const user = await prisma.user.findUniqueOrThrow({
				where: { id: decodedToken.user_id }
			});

			res.status(200).json(user);
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
