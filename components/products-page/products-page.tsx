"use client";

import { useState } from "react";

import Link from "next/link";
import { getData } from "@/fetch/fetch";

import Loader from "../ui/loader";
import CategoryDropdown from "../ui/category-dropdown";
import ProductCard from "../product-card/product-card";

import { Product } from "@/types/types";

interface Props {
  products: Product[];
}

export default function ProductsPage({ products }: Props) {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [productsData, setProductsData] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string>("All Products");

  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryChange = async (category: string) => {
    if (category === "All Products") {
      setProductsData(products);
      setActiveCategory(category);
    } else {
      setLoading(true);
      try {
        const res = await getData(`/products/category/${category}`);
        setProductsData(res);
        setActiveCategory(category);
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <header className="flex lg:items-center justify-between flex-col lg:flex-row gap-2">
        <p className="text-3xl font-bold capitalize">{activeCategory}</p>

        <div className="flex md:items-center gap-2 flex-col md:flex-row items-end">
          <input
            type="text"
            className="bg-white py-3 px-4 rounded-lg focus:outline-none border max-w-[300px] focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <CategoryDropdown
            onChange={handleCategoryChange}
            activeCategory={activeCategory}
          />

          <Link href="/add-product" className="btn-primary !w-fit">Add A Product</Link>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </main>

      {loading && <Loader />}
    </>
  );
}
