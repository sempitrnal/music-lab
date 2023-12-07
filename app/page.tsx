import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>music lab</h1>
			<Image
				src="/palejoe.jpg"
				width={500}
				height={500}
				alt="joe"
				className="rounded-xl"
			/>
		</main>
	);
}
