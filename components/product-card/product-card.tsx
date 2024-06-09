import { useCartStore } from "@/stores/cart-store";

import Image from "next/image";

import { Product } from "@/types/types";
import { RateStar } from "@/assets/product-svgs";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="p-4 flex flex-col gap-2 bg-white rounded-lg border hover:shadow-lg overflow-hidden cursor-pointer hover:scale-110">
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={400}
        className="aspect-square w-full"
      />

      <p className="text-primary text-sm capitalize">{product.category}</p>
      <p className="hover:text-primary duration-300 line-clamp-1">
        {product.title}
      </p>

      <p className="flex items-center gap-1">
        Reviews: {product.rating.rate}
        <RateStar />/{" "}
        <span className="text-cyan-400">{product.rating.count}</span>
      </p>

      <div className="flex items-center justify-between gap-1 mt-4">
        <p className="text-xl font-bold">{product.price}$</p>
        <button className="btn-primary !w-fit" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
