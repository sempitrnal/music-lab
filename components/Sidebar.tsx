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
			className={` flex bg-white z-50 justify-center p-5 md:py-10 right-0   fixed left-0 top-0 md:bottom-0 md:h-screen md:w-14 border-r shadow-md `}
		>
			<div className="flex flex-row gap-2 md:flex-col">
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
