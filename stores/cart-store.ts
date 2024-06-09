import create from 'zustand';
import toast from 'react-hot-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addToCart: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      state.items.push(item);
    }
    toast.success("Added successfully to cart");
    return {
      items: state.items,
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    };
  }),
  removeFromCart: (id) => set((state) => {
    const items = state.items.filter(item => item.id !== id);
    return {
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
    };
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const item = state.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
    }
    return {
      items: state.items,
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    };
  }),
}));
