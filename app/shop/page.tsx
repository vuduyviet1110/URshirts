import Products from "@/components/Products";
import { FetchProducts } from "../actions/getStripProducts";

const page = async () => {
  const products:any = await FetchProducts();
  const productswithoutCustome = products.filter(
    (product:any) => product.metadata?.custome !== "true"
  );
  return <Products allProducts={productswithoutCustome} />;
};

export default page;