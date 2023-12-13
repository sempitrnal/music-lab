export enum Discount {
	"5%",
	"10%",
}
export type Sale = {
	id: number;
	inventory_item_id: string;
	quantity: number;
	created_at: string;
	sales_date: string;
	discount: Discount;
	inventory: Item;
	sales_id: number;
};
export type Item = {
	id: number;
	name: string;
	item_id: string;
	price: number;
	image_url: string;
};
