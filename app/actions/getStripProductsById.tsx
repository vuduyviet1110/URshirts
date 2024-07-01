import Stripe from "stripe";

export const FetchProductById = async (productId: string) => {
  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY as string,
    {
      apiVersion: "2024-04-10",
    }
  );

  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.list({
    product: product.id,
    limit: 1,
  });

  return {
    id: product.id,
    name: product.name,
    price_id: price.data[0]?.id || null,
    unit_amount: price.data[0]?.unit_amount || null,
    image: product.images[0],
    currency: price.data[0]?.currency || null,
    description: product.description,
    metadata: product.metadata,
  };
};