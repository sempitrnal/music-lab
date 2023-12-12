"use client";
import { Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineStock } from "react-icons/ai";
import { PiGuitar } from "react-icons/pi";
const Sidebar = () => {
	const path = usePathname();

	const links = [
		{
			name: "Sales",
			icon: <AiOutlineStock />,
			href: "/sales",
			isActive: path === "/sales",
		},
		{
			name: "Inventory",
			icon: <PiGuitar />,
			href: "/inventory",
			isActive: path === "/inventory",
		},
	];
	return (
		<nav
			className={`md:flex hidden justify-center p-5 py-10   fixed left-0 top-0 bottom-0 h-screen w-14 border-r shadow-md`}
		>
			<div className="flex flex-col gap-2">
				{links.map((link, i) => (
					<Tooltip
						bg="white"
						color="black"
						border="1px lightgray solid "
						borderRadius="md"
						label={link.name}
						placement="right"
						className="bg-white"
						key={i}
					>
						<Link href={link.href} className="">
							{" "}
							<div
								className={`rounded-md p-1 transition cursor-pointer text-2xl ${
									link.isActive
										? "bg-stone-800 text-white"
										: " text-stone-500 hover:bg-stone-100 "
								}`}
							>
								{link.icon}
							</div>
						</Link>
					</Tooltip>
				))}
			</div>
		</nav>
	);
};

export default Sidebar;
