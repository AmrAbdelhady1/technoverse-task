import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onChange: (category: string) => void;
  activeCategory: string;
}

const categories = [
  "All Products",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function CategoryDropdown({ onChange, activeCategory }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative py-3 px-4 rounded-lg w-[200px] cursor-pointer border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="capitalize font-medium">{activeCategory}</p>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2">
              {categories.map((category, index) => (
                <p
                  key={index}
                  onClick={() => onChange(category)}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 capitalize"
                >
                  {category}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
