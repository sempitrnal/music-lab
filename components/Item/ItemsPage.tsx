"use client";
import { Search, ShoppingCartIcon } from "lucide-react";
import { Input } from "../ui/input";

import { useCartStore } from "@/store/cart";
import { Item, Sale } from "@/types/types";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import CartItem from "../Cart/CartItem";
import { Button } from "../ui/button";
import ItemCard from "./ItemCard";
import { toast } from "../ui/use-toast";
import supabase from "@/supabase/supabase";
import { revalidatePath } from "next/cache";

type ItemsPageProps = {
	items: Item[];
};

const ItemsPage = ({ items }: ItemsPageProps) => {
	const [search, setSearch] = useState<string>("");
	const [itemsState, setItemsState] = useState<Item[]>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const cart = useCartStore((state) => state.cart);

	const resetCart = useCartStore((state) => state.resetCart);

	useEffect(() => {
		setItemsState(items);
	}, [items]);

	useEffect(() => {
		if (search) {
			const filteredItems = items.filter((item) => {
				return (
					item.name.toLowerCase().includes(search.toLowerCase()) ||
					item.item_id.toLowerCase().includes(search.toLowerCase())
				);
			});
			setItemsState(filteredItems);
		} else {
			setItemsState(items);
		}
	}, [search]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const btnRef = useRef();

	const checkout = async () => {
		setIsSubmitting(true);

		const { data: sales, status } = await supabase
			.from("sales")
			.insert({})
			.select("id");
		if (status == 201) {
			cart.map(async (cartItem) => {
				const {
					data: sale,
					status,
					error,
				} = await supabase.from("sale").insert([
					{
						sales_id: sales[0]?.id,
						inventory_item_id: cartItem.item.item_id,
						quantity: cartItem.quantity,
						discount: undefined,
					},
				]);
			});
			const { data, error } = await supabase
				.from("sale")
				.select(
					`*,
				inventory(id, name, item_id, price, image_url)`
				)
				.eq("sales_id", sales[0]?.id);

			if (data) {
				const sales_update = await supabase
					.from("sales")
					.update({
						total: data.reduce(
							(total, item) => total + item.quantity * item.inventory.price,
							0
						),
						items: data.map((item: Sale) => item.id.toString()),
					})
					.eq("id", sales[0]?.id)
					.select();

				if (sales_update.status == 200) {
					onClose();
					resetCart();
					toast({
						title: "Checkout successful",
						description: "Thank you for shopping with us!",
					});
					setIsSubmitting(false);
				}
			}
		}
	};
	return (
		<div>
			<Drawer size={"md"} isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Cart ({cart.length})</DrawerHeader>

					<DrawerBody>
						<div className="flex flex-col justify-between h-full">
							<div className="flex flex-col gap-3">
								{cart?.map((cartItem, i) => {
									return (
										<CartItem
											key={cartItem.item.id}
											index={i}
											cartItem={cartItem}
											cartLength={cart.length}
										/>
									);
								})}
								{cart.length === 0 && (
									<p className="text-center">No items in cart</p>
								)}
							</div>
							{cart.length > 0 && (
								<div className="flex flex-col">
									<div className="flex items-center justify-between">
										<p>Total</p>
										<p className="font-bold">
											₱{" "}
											{cart
												?.reduce(
													(total, item) =>
														total + item.item.price * item.quantity,
													0
												)
												.toFixed(2)}
										</p>
									</div>
									<Button
										onClick={checkout}
										disabled={isSubmitting}
										className="mt-10 mb-5 font-bold disabled:cursor-not-allowed"
									>
										{isSubmitting ? "Processing..." : "Checkout"}
									</Button>
								</div>
							)}
						</div>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<div className="flex items-center w-full gap-3 mb-10 ">
				<div className="relative w-full md:w-[20rem]">
					<Search className="absolute scale-75 left-2 text-stone-400 top-2" />
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search items"
						className="transition-all"
					/>
				</div>
				<div
					className="relative transition cursor-pointer hover:text-stone-700"
					onClick={onOpen}
				>
					<ShoppingCartIcon />
					{cart.length > 0 && (
						<div className="absolute w-4 flex justify-center items-center  text-white font-bold h-4  text-[10px] top-[-5px] right-[-5px] bg-red-400 rounded-[99rem]">
							<p>{cart.length}</p>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-row flex-wrap justify-center gap-10 md:justify-start">
				{itemsState && itemsState.length > 0 && search ? (
					itemsState.map((item) => <ItemCard item={item} key={item.id} />)
				) : itemsState && itemsState.length === 0 && search ? (
					<p>No items found</p>
				) : (
					itemsState &&
					itemsState.map((item) => <ItemCard item={item} key={item.id} />)
				)}
			</div>
		</div>
	);
};

export default ItemsPage;
