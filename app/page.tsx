import { getData } from "@/fetch/fetch";

import ProductsPage from "@/components/products-page/products-page";

export default async function Home() {
  const res = await getData("/products");

  return <ProductsPage products={res} />;
}
