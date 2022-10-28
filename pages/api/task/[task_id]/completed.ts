import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.patch) {
      const { completed, task_id: taskId } = req.query;

      await prisma.task.update({
        where: {
          id: taskId as string,
        },
        data: {
          completed:
            completed === "true"
              ? true
              : completed == "false"
              ? false
              : undefined,
        },
      });
    }
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
