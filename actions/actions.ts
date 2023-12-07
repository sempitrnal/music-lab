"use server";

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
