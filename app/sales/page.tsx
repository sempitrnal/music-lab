import SalesPage, { Sales } from "@/components/Sales/SalesPage";
import supabase from "@/supabase/supabase";
import { Sale } from "@/types/types";
import { createClient } from "@supabase/supabase-js";
import { TextQuote } from "lucide-react";

export const revalidate = 1;

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
	const today = new Date().toLocaleDateString().split("T")[0];

	const { data: sales, error: asd } = await supabase
		.from("sales")
		.select()
		.eq("sales_date", today)
		.order("created_at", { ascending: true });

	const { data: sale, error: asd2 } = await supabase
		.from("sale")
		.select(`*, inventory(name,price, image_url, stocks)`);
	return (
		<div>
			<h1 className="text-[3rem] mb-10">Sales</h1>
			<h2 className="mb-10 text-lg font-semibold">
				{getCurrentDateFormatted()}
			</h2>
			<div className="flex gap-3 mb-5">
				<SalesPage sales={sales as Sales[]} sale={sale as Sale[]} />
			</div>
		</div>
	);
};

export default Sales;
