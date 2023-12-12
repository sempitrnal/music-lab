"use client";

import supabase from "@/supabase/supabase";
import { Sale } from "@/types/types";
import { Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type SalesPageProps = {
	sales: Sales[];
	sale: Sale[];
};
export type Sales = {
	id: number;
	items: number[];
	total: number;
	created_at: string;
	mode_of_payment: string;
};
const SalesPage = ({ sales, sale }: SalesPageProps) => {
	const [items, setItems] = useState<any>(null);
	const [salesItems, setSalesItems] = useState<Sales[]>();
	const [saleItems, setSaleItems] = useState<Sale[] | null>(null);

	useEffect(() => {
		if (sales) {
			setSalesItems(sales);
			setSaleItems(sale);
		}
	}, [sales]);

	if (salesItems === null || saleItems === null) {
		return <div>Loading...</div>;
	} else
		return (
			<>
				<div className="flex flex-col gap-3 w-[25rem]">
					{sales?.map((sale, i) => {
						const items = saleItems?.filter((item) =>
							sale.items.includes(item.id)
						);

						return (
							<div className="flex flex-col " key={sale.id}>
								<div className="flex justify-between">
									<p className="">
										{new Date(sale.created_at).toLocaleTimeString("ph-PH", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: true,
										})}
									</p>
									<Tooltip
										bg="white"
										color="black"
										border="1px lightgray solid "
										borderRadius="md"
										label={`paid via ${sale.mode_of_payment}`}
										placement="right"
										className="bg-white "
									>
										<Image
											src="/maya.svg"
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
											<p>₱ {sale.total}</p>
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
