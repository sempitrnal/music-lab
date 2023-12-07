import AddSaleButton from "@/components/AddSaleButton";
import { Button } from "@chakra-ui/button";
import { createClient } from "@supabase/supabase-js";

enum Discount {
	Five,
	Ten,
}
type Sale = {
	id: number;
	inventory_item_id: string;
	quantity: number;
	created_at: string;
	sales_date: string;
	discount: Discount;
	inventory: Item;
};
export type Item = {
	id: number;
	name: string;
	item_id: string;
	price: number;
	image_url: string;
};
export const revalidate = 5;
function getCurrentDate(): string {
	const today: Date = new Date();

	const year: number = today.getFullYear();
	const month: number = today.getMonth() + 1; // Month is zero-based, so we add 1
	const day: number = today.getDate();

	// Ensure single-digit months and days are padded with a leading zero
	const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
	const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

	// Form the date string in "yyyy-mm-dd" format
	const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

	return formattedDate;
}
const Sales = async () => {
	const supabase = createClient(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_ANON_KEY as string
	);

	let { data: sales, error: asd } = await supabase
		.from("sales")
		.select(
			`*,
    inventory(id, name, item_id, price, image_url)`
		)
		.eq("sales_date", getCurrentDate());
	const { data: items } = await supabase
		.from("inventory")
		.select(`*`)
		.returns<Item[]>();

	return (
		<div>
			<h1 className="text-[3rem] mb-10">Sales</h1>
			<AddSaleButton items={items as Item[]} />
			{sales?.map(async (sale: Sale, i: number) => {
				const { name: item_name, price, image_url } = sale.inventory;
				return (
					<div key={sale.id} className="flex justify-start w-full gap-2 ">
						<p>{item_name}</p>
						<p>{sale.quantity}</p>
						<p>{sale.sales_date}</p>
						<p>{sale.discount}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Sales;
