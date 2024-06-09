"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";

import { CartIcon } from "@/assets/header-svgs";
import Image from "next/image";

const CartDropdown = () => {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <span className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CartIcon />
        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 text-center text-xs">
          {items.length}
        </span>
      </span>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-[300px] md:w-[500px]">
          <div className="p-4">
            {items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                    <div className="flex-1 ml-2">
                      <p className="font-semibold line-clamp-1">{item.name}</p>
                      <p>${item.price}</p>
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeFromCart(item.id);
                          }}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="font-semibold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
