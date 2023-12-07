"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, MinusIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import { Item } from "@/app/sales/page";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { createClient } from "@supabase/supabase-js";
import { addSale } from "@/actions/actions";
import { CircularProgress, Spinner } from "@chakra-ui/react";

export const formSchema = z.object({
	item: z.string(),
	quantity: z.string(),
	discount: z.enum(["0", "5%", "10%"]).optional(),
	sales_date: z.date(),
});

type AddSaleButtonProps = {
	items: Item[];
};
const AddSaleButton = ({ items }: AddSaleButtonProps) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [discount, setDiscount] = useState("0");
	const [currentItem, setCurrentItem] = useState<Item | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			item: "",
			quantity: "1",
			discount: undefined,
			sales_date: new Date(),
		},
	});
	const closeRef = useRef<HTMLButtonElement>(null);
	console.log(isSubmitting);
	return (
		<Dialog>
			<DialogTrigger className="p-2 text-white transition rounded-md bg-black/90 hover:opacity-90">
				Add Sale
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add sale ayyeee</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<DialogClose ref={closeRef} className="hidden "></DialogClose>
				<Form {...form}>
					<form
						className="flex flex-col gap-5"
						action={async () => {
							if (
								form.getValues("item") === "" ||
								form.getValues("quantity") === ""
							) {
								return;
							} else {
								setIsSubmitting(true);
								const formData = new FormData();
								formData.append("item", currentItem?.item_id!);
								formData.append("quantity", quantity.toString());
								formData.append("discount", discount);
								formData.append(
									"sales_date",
									form.getValues("sales_date").toString()
								);
								const error = await addSale(formData);
								if (error === null) {
									closeRef.current?.click();
									form.reset({
										item: "",
										quantity: "1",
										discount: undefined,
									});
									setValue("");
									setCurrentItem(null);
									setDiscount("0");
									setQuantity(1);
									setIsSubmitting(false);
								}
							}
						}}
					>
						<FormField
							control={form.control}
							name="item"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Item</FormLabel>
									<FormControl>
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													role="combobox"
													aria-expanded={open}
													className="justify-between w-full"
												>
													{value
														? items.find(
																(item) => item.item_id.toLowerCase() === value
														  )?.name +
														  "   ₱ " +
														  items.find(
																(item) => item.item_id.toLowerCase() === value
														  )?.price
														: "Select item..."}
													<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className=" w-[20rem] p-0">
												<Command>
													<CommandInput placeholder="Search item..." />
													<CommandEmpty>No item found.</CommandEmpty>
													<CommandGroup>
														{items.map((item) => (
															<CommandItem
																className="cursor-pointer hover:bg-gray-100"
																key={item.id}
																value={item.item_id}
																onSelect={(currentValue) => {
																	setValue(
																		currentValue === value ? "" : currentValue
																	);
																	currentValue === value
																		? form.setValue("item", "")
																		: form.setValue(
																				"item",
																				currentValue.toUpperCase()
																		  );

																	currentValue === value
																		? setCurrentItem(null)
																		: setCurrentItem(item);
																	setOpen(false);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		value === item.item_id.toLowerCase()
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{item.name} ₱ {item.price}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Quantity</FormLabel>
									<div className="flex items-center">
										<FormControl>
											<Input {...field} className="flex justify-center w-14" />
										</FormControl>
										<div className="flex items-center justify-center w-32 h-full">
											<MinusIcon
												onClick={() => {
													if (Number(form.getValues("quantity")) === 1) {
														return;
													} else {
														setQuantity((prev) => prev - 1);
														form.setValue(
															"quantity",
															(
																Number(form.getValues("quantity")) - 1
															).toString()
														);
													}
												}}
												className="w-10 h-full px-2 transition border-t border-b border-l rounded-tl-sm rounded-bl-sm cursor-pointer hover:bg-stone-50"
											/>
											<PlusIcon
												onClick={() => {
													setQuantity((prev) => prev + 1);
													form.setValue(
														"quantity",
														(Number(form.getValues("quantity")) + 1).toString()
													);
												}}
												className="w-10 h-full px-2 transition border rounded-tr-sm rounded-br-sm cursor-pointer hover:bg-stone-50"
											/>
										</div>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="discount"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Discount</FormLabel>
									<FormControl>
										<Select
											onValueChange={(e) => {
												field.onChange(e);
												setDiscount(e);
											}}
											defaultValue={field.value}
										>
											<SelectTrigger className="">
												<SelectValue placeholder="Discount" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">None</SelectItem>
												<SelectItem value="5%">5%</SelectItem>
												<SelectItem value="10%">10%</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<div className="">
							Total: ₱{" "}
							{currentItem
								? form.getValues("discount") !== "0"
									? currentItem?.price * quantity -
									  currentItem?.price * quantity * (parseInt(discount) / 100)
									: currentItem?.price * quantity
								: 0}
						</div>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? <Spinner /> : "Submit"}
						</Button>
					</form>{" "}
				</Form>{" "}
			</DialogContent>
		</Dialog>
	);
};

export default AddSaleButton;
