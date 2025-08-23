import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./animations.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Matatu Finder",
	description: "Find routes and fares easily",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
