import Sidebar from "@/components/Sidebar";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

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
