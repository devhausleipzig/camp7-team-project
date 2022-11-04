import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type TokenData = {
	email: string;
	password: string;
};

export type Payload = {
	user_id: string;
	email: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.post) {
			const { email, password }: TokenData = JSON.parse(req.body);

			const user = await prisma.user.findUniqueOrThrow({
				where: {
					email
				}
			});

			const { saltAndHash } = user;

			const match = await bcrypt.compare(password, saltAndHash);

			if (match) {
				const token = jwt.sign(
					{ user_id: user.id, email: user.email } as Payload,
					process.env.TOKEN_KEY as string,
					{
						expiresIn: "24h"
					}
				);

				res.status(200).json({
					token
				});
			} else {
				res.status(401).json({
					message: "Username or password not valid."
				});
			}

			return;
		}

		res.status(500).json({ message: "Unknown request." });
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
