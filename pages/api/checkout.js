import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import Stripe from "stripe";

export default async function handle(req, res) {
  await mongooseConnect();

  const stripe = new Stripe(process.env.STRIPE_SK);

  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }
  const orderDocument = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=true",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=true",
    metadata: {
      orderId: orderDocument._id.toString(),
      test: "ok",
    },
  });
  res.json({
    url: session.url,
  });
}
