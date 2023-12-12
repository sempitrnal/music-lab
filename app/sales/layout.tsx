import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sales",
	description: "",
};

export default async function SalesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section className="">{children}</section>;
}
