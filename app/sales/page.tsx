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
function getCurrentDateFormatted(): string {
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const today: Date = new Date();
	const month: number = today.getMonth();
	const day: number = today.getDate();
	const year: number = today.getFullYear();

	const monthName: string = months[month];
	const formattedDate: string = `${monthName} ${day}, ${year}`;

	return formattedDate;
}

const Sales = async () => {
	const supabase = createClient(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_ANON_KEY as string
	);

	const { data: sales, error: asd } = await supabase
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
	const totalSales = sales?.reduce((total, sale) => {
		// Assuming properties like quantity, price, and discount are present in the sales data
		const quantity = sale.quantity || 0;
		const price = sale.inventory.price || 0;
		const discount = sale.discount || 0;

		// Calculate the total for each sale record
		const saleTotal = discount
			? quantity * price -
			  quantity * price * (parseInt(discount.toString()) / 100)
			: quantity * price;

		// Add the sale total to the overall total
		return total + saleTotal;
	}, 0);

	return (
		<div>
			<h1 className="text-[3rem] mb-10">Sales</h1>
			<h2 className="mb-10 text-2xl">{getCurrentDateFormatted()}</h2>
			<div className="mb-5">
				<AddSaleButton items={items as Item[]} />
			</div>

			{sales?.map(async (sale: Sale, i: number) => {
				const {
					id: sale_id,
					inventory_item_id,
					quantity,
					created_at,
					sales_date,
					discount,
				} = sale;
				const {
					name: item_name,
					price,
					image_url,
					item_id: id,
				} = sale.inventory;
				const total = price * quantity;
				return (
					<div key={sale_id} className="flex w-full mb-5">
						<p className="w-10 translate-y-1">{i + 1} )</p>
						<div className="flex flex-col w-full gap-2">
							<div className="flex items-center w-full ">
								<div className="flex flex-col w-full ">
									<p className="text-xl font-semibold">{item_name}</p>
									<p className="text-sm text-stone-500">{id}</p>
								</div>
								<p className="flex w-full font-medium">Quantity {quantity}</p>
							</div>
							{discount && (
								<p className="px-2 py-1 text-sm text-black bg-green-300 rounded-md w-max">
									{discount} Discount
								</p>
							)}
							{discount && (
								<p className="text-sm">Original price: ₱ {price.toFixed(2)}</p>
							)}
							<p className="flex w-full font-medium">
								Total: ₱{" "}
								{discount
									? (
											total -
											total * (parseInt(discount.toString()) / 100)
									  ).toFixed(2)
									: total.toFixed(2)}
							</p>
						</div>
					</div>
				);
			})}
			<p>Total sales: ₱ {totalSales.toFixed(2)}</p>
		</div>
	);
};

export default Sales;
