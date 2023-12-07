import { Tooltip } from "@chakra-ui/react";
import { AiOutlineStock } from "react-icons/ai";
import { PiGuitar } from "react-icons/pi";
import { headers } from "next/headers";
import Link from "next/link";
const Sidebar = () => {
	const headersList = headers();
	const domain = headersList.get("host") || "";
	const fullUrl = headersList.get("referer") || "";
	const path = fullUrl.replace("http://" + domain, "");

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
					<Link href={link.href} className="" key={i}>
						{" "}
						<div
							className={`rounded-md p-1 transition cursor-pointer text-2xl ${
								link.isActive
									? "bg-stone-800 text-white"
									: " text-stone-500 hover:bg-stone-100 "
							}`}
						>
							<Tooltip
								hasArrow
								className="p-2 py-1 text-sm bg-white border rounded-lg text-stone-600 "
								label={link.name}
								placement="right"
							>
								{link.icon}
							</Tooltip>
						</div>
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Sidebar;
