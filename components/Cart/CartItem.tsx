import { CartItem, useCartStore } from "@/store/cart";
import { Delete, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import IncreaseQuantityButton from "../IncreaseQuantityButton";
import DecreaseQuantityButton from "../DecreaseQuantityButton";
import Image from "next/image";

type CartItemProps = {
	cartItem: CartItem;
	index: number;
	cartLength: number;
};

const CartItem = ({ cartItem, index, cartLength }: CartItemProps) => {
	const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
	const increaseQuantity = useCartStore((state) => state.increaseQuantity);
	const deleteFromCart = useCartStore((state) => state.deleteFromCart);
	return (
		<div className="" key={cartItem.item.id}>
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-2">
					{cartItem.item.image_url ? (
						<div className="relative w-32 h-32 px-10">
							<Image
								src={cartItem.item.image_url}
								alt={cartItem.item.name}
								fill
								className="object-cover rounded-sm"
							/>
						</div>
					) : (
						<div
							className={`w-32 h-32 px-10  rounded-sm bg-stone-700  text-white font-bold text-2xl flex justify-center items-center text-center`}
						>
							{cartItem.item.name}
						</div>
					)}
					<p className="text-lg font-semibold">{cartItem.item.name}</p>
				</div>
				<div
					className=""
					onClick={() => {
						deleteFromCart(cartItem);
					}}
				>
					<Trash2 className="w-6 h-6 ml-2 text-red-500 transition cursor-pointer shrink-0 hover:opacity-90" />
				</div>
			</div>
			<p className="mb-2 text-sm">{cartItem.item.item_id}</p>

			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-5">
					<div className="flex flex-col gap-1">
						<div className="flex gap-2">
							<p className="font-medium">Quantity</p>
							<div className="flex items-center justify-end">
								<DecreaseQuantityButton
									handler={() => decreaseQuantity(cartItem)}
									cartItem={cartItem}
								/>
								<p className="w-10 text-center">{cartItem.quantity}</p>
								<IncreaseQuantityButton
									handler={() => increaseQuantity(cartItem)}
								/>
							</div>
						</div>
						<p className="font-bold">
							₱ {(cartItem.item.price * cartItem.quantity).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
			{index !== cartLength - 1 && <hr className="my-5" />}
		</div>
	);
};

export default CartItem;
