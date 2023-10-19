import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  const { parent } = req.query;
  console.log(parent);
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find({ parent: parent }));
  }
}
