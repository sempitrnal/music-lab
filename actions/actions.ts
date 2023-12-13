"use server";

import { CartItem } from "@/store/cart";
import supabase from "@/supabase/supabase";
import { Sale } from "@/types/types";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
export const addSale = async (formData: FormData) => {
	let discount: string | undefined = formData.get("discount") as string;
	const item = formData.get("item") as string;
	const quantity = formData.get("quantity") as string;
	const sales_date = new Date(formData.get("sales_date") as string);
	if (discount === "0") {
		discount = undefined;
	}

	const supabase = createClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!
	);
	// const { data: sale, error } = await supabase.from("sales").select();
	const { data: sale, error } = await supabase
		.from("sales")
		.insert({
			inventory_item_id: item,
			quantity: Number(quantity),
			discount: discount,
			sales_date: sales_date,
		})
		.select();
	revalidatePath("/sales");
	return error;
};

export const checkout = async (cart: CartItem[], mop: string) => {
	const {
		data: sales,
		error,
		status,
	} = await supabase
		.from("sales")
		.insert({
			mode_of_payment: mop,
		})
		.select("id");

	if (status == 201 && sales) {
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
		revalidatePath("/sales");
		return status;
	}
};
