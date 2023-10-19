import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  const { category } = req.query;

  await mongooseConnect();

  if (method === "GET") {
    res.json(await Product.find({ category: category }));
  }
}
