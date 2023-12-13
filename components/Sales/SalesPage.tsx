"use client";

import { Sale } from "@/types/types";
import { Tooltip } from "@chakra-ui/react";
import Image from "next/image";
enum Discount {
	"5%",
	"10%",
}
function calculateTotalSaleAmount(sales: Sale[]): number {
	let totalAmount = 0;

	for (const sale of sales) {
		const itemPrice = sale.inventory.price; // Replace 'price' with the actual property name
		const discountPercentage = parseInt(sale.discount?.toString()) / 100 || 0;

		const discountedPrice = itemPrice * (1 - discountPercentage);
		const saleAmount = discountedPrice * sale.quantity;

		totalAmount += saleAmount;
	}

	return totalAmount;
}

type SalesPageProps = {
	sales: Sales[];
	sale: Sale[];
};
export type Sales = {
	id: number;
	created_at: string;
	mode_of_payment: string;
};
const SalesPage = ({ sales, sale }: SalesPageProps) => {
	if (!sales) {
		return <div>Loading...</div>;
	} else
		return (
			<>
				<div className="flex flex-col gap-10 w-full md:w-[30rem]">
					{sales?.map((salesItem, i) => {
						const items = sale.filter((item) => {
							return salesItem.id === item.sales_id;
						});
						const mop = salesItem.mode_of_payment;
						return (
							<div className="flex flex-col " key={salesItem.id}>
								<div className="flex items-center justify-between mb-2">
									<p className="">
										{new Date(salesItem.created_at).toLocaleTimeString(
											"ph-PH",
											{
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											}
										)}
									</p>
									<Tooltip
										bg="white"
										color="black"
										border="1px lightgray solid "
										borderRadius="md"
										label={`paid via ${salesItem.mode_of_payment}`}
										placement="right"
										className="bg-white "
									>
										<Image
											src={
												mop === "cash"
													? "/cash.png"
													: mop === "gcash"
													? "/gcash.svg"
													: mop === "mastercard"
													? "/mc.svg"
													: mop === "visa"
													? "/visa.svg"
													: mop === "paymaya"
													? "/maya.svg"
													: "/cash.png"
											}
											width={50}
											height={50}
											alt="hello"
											className="transition-all duration-500 ease-in-out cursor-pointer hover:scale-110"
										/>
									</Tooltip>
								</div>
								<div className="flex w-full gap-2">
									<div className="">{i + 1})</div>
									<div className="flex flex-col w-full gap-2">
										{items?.map((item) => {
											return (
												<div className="" key={item.id}>
													<div className="flex flex-col gap-1">
														<p className="font-bold">{item.inventory.name}</p>
														<div className="flex justify-between">
															<p>
																₱ {item.inventory.price} x {item.quantity}
															</p>
															<p>₱ {item.inventory.price * item.quantity}</p>
														</div>
														<hr />
													</div>
												</div>
											);
										})}
										<div className="flex justify-between ">
											<p className="font-bold">Total</p>
											<p>₱ {calculateTotalSaleAmount(items).toFixed(2)}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
};

export default SalesPage;
