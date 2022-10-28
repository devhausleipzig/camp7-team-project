import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const { task_id } = req.query;

      const task = await prisma.task.findUnique({
        where: { id: task_id as string },
        include: {
          assignedTo: true,
        },
      });

      res.status(200).json(task);
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
