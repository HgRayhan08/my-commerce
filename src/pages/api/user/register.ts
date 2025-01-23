import { register } from "@/lib/firebase/servis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    await register(req.body, (status: boolean) => {
      if (status == true) {
        res
          .status(200)
          .json({ status: true, statusCode: "200", message: "Succses" });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: "400", message: "Failed" });
      }
    });
  } else {
    res
      .status(405)
      .json({ status: true, statusCode: "405", message: "Method Not Allowed" });
  }
}
