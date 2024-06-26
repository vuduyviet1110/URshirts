import Products from "@/components/Products";
import { FetchProducts } from "../actions/getStripProducts";

const page = async () => {
  const products = await FetchProducts();
  return <Products allProducts={products} />;
};

export default page;