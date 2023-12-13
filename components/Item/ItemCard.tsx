"use client";

import { useCartStore } from "@/store/cart";
import { Item } from "@/types/types";
import { PopoverClose } from "@radix-ui/react-popover";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";

type ItemCardProps = {
	item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
	const addToCart = useCartStore((state) => state.addToCart);
	const [quantity, setQuantity] = useState(1);
	const { toast } = useToast();

	const popoverClose: RefObject<HTMLButtonElement> = useRef(null);
	return (
		<div key={item.id} className="flex flex-col items-center gap-2">
			<div className="p-5 rounded-md shadow-md w-[18rem] flex-col flex justify-end h-[20rem] ">
				{item.image_url ? (
					<div className="relative w-full h-full">
						<Image
							src={item.image_url}
							alt={item.name}
							fill
							className="object-cover rounded-sm"
						/>
					</div>
				) : (
					<div
						className={`w-full h-full  rounded-sm bg-stone-700  text-white font-bold text-2xl flex justify-center items-center text-center`}
					>
						{item.name}
					</div>
				)}
				<p className="mt-5 text-sm font-bold text-[#575757] ">{item.item_id}</p>
				<p className="mb-2 font-medium">{item.name}</p>
				<div className="flex items-center justify-between">
					<p className="font-bold">PHP {item.price.toFixed(2)}</p>
					<Popover>
						<PopoverTrigger asChild>
							<Button className="font-bold ">Add</Button>
						</PopoverTrigger>
						<PopoverClose className="hidden" ref={popoverClose}></PopoverClose>
						<PopoverContent>
							<div className="flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<p>Quantity</p>
									<div className="flex items-center justify-end">
										<button
											disabled={quantity === 1}
											onClick={() => {
												if (quantity > 1) {
													setQuantity(quantity - 1);
												}
											}}
											className="flex items-center justify-center px-3 font-bold text-white transition duration-300 bg-red-500 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-90"
										>
											-
										</button>
										<p className="w-10 text-center">{quantity}</p>
										<button
											onClick={() => {
												setQuantity(quantity + 1);
											}}
											className="flex items-center justify-center px-3 font-bold text-white bg-[#61d37f] 
											transition duration-300 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-90
											"
										>
											+
										</button>
									</div>
								</div>
								<Button
									onClick={() => {
										addToCart({ item, quantity });
										popoverClose?.current?.click();
										toast({
											title: "Item added to cart",
											description: (
												<p className="font-medium">{`${item.name} x ${quantity}`}</p>
											),
										});
									}}
									className="mt-2 font-bold "
								>
									Add to Cart
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
