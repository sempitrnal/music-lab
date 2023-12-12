import { Item } from "@/types/types";
import { create } from "zustand";

export type CartItem = {
	item: Item;
	quantity: number;
};

type CartStore = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	resetCart: () => void;
	deleteFromCart: (item: CartItem) => void;
	decreaseQuantity: (item: CartItem) => void;
	increaseQuantity: (item: CartItem) => void;
};

export const useCartStore = create<CartStore>((set) => ({
	cart: [],
	addToCart: (item) =>
		set((state) => {
			const existingItemIndex = state.cart.findIndex(
				(cartItem) => cartItem.item.id === item.item.id
			);

			if (existingItemIndex !== -1) {
				// If item exists in the cart, update the quantity
				const updatedCart = [...state.cart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + 1,
				};

				return { cart: updatedCart };
			} else {
				// If item doesn't exist in the cart, add it
				return { cart: [...state.cart, { ...item, quantity: 1 }] };
			}
		}),
	deleteFromCart: (item) =>
		set((state) => ({
			cart: state.cart.filter((cartItem) => cartItem.item.id !== item.item.id),
		})),
	decreaseQuantity: (item) =>
		set((state) => ({
			cart: state.cart.map((cartItem) => {
				if (cartItem.item.id === item.item.id) {
					return {
						...cartItem,
						quantity: cartItem.quantity - 1,
					};
				}
				return cartItem;
			}),
		})),
	increaseQuantity: (item) =>
		set((state) => ({
			cart: state.cart.map((cartItem) => {
				if (cartItem.item.id === item.item.id) {
					return {
						...cartItem,
						quantity: cartItem.quantity + 1,
					};
				}
				return cartItem;
			}),
		})),
	resetCart: () => set({ cart: [] }),
}));
