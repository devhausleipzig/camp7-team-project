import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import task from "../task";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const user = await prisma.task.groupBy({
        by: ["id"],
        where: {
          completed: true,
        },
        _sum: {
          points: true,
        },
        having: {},
      });
      res.status(200).json(task);
      return;
    }

    res.status(500).send("unknown request");
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
