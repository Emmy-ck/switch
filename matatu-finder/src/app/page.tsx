import HomeClient from "./home-client";

export default function Home() {
	return (
		<main className="min-h-screen flex items-start justify-center p-6">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-center mb-6">Matatu Finder</h1>
				<HomeClient />
			</div>
		</main>
	);
}
