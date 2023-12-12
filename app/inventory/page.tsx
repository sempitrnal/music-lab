import ItemsPage from "@/components/Item/ItemsPage";
import { Item } from "@/types/types";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Inventory",
	description: "",
};
const Test = async () => {
	const supabase = createClient(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_ANON_KEY as string
	);

	const { data: items, error } = await supabase.from("inventory").select("*");

	return <ItemsPage items={items as Item[]} />;
};

export default Test;
