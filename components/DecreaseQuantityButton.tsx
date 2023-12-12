import { CartItem } from "@/store/cart";

type DecreaseQuantityButtonProps = {
	cartItem: CartItem;
	handler: () => void;
};

const DecreaseQuantityButton = ({
	handler,
	cartItem,
}: DecreaseQuantityButtonProps) => {
	return (
		<button
			disabled={cartItem.quantity === 1}
			onClick={() => {
				if (cartItem.quantity > 1) {
					handler();
				}
			}}
			className="flex items-center justify-center px-3 font-bold text-white transition duration-300 bg-red-500 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-90"
		>
			-
		</button>
	);
};

export default DecreaseQuantityButton;
