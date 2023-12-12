export enum Discount {
	Five,
	Ten,
}
export type Sale = {
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
