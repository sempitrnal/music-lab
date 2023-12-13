export interface ModeOfPaymentOption {
	readonly value: string;
	readonly label: string;
	readonly isFixed?: boolean;
}

export const modeOfPaymentOptions: readonly ModeOfPaymentOption[] = [
	{ value: "cash", label: "Cash" },
	{ value: "gcash", label: "GCash" },
	{ value: "paymaya", label: "Maya" },
	{ value: "mastercard", label: "Mastercard" },
	{ value: "visa", label: "Visa" },
];
