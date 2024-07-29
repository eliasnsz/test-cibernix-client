import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "../styles/globals.css";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export const metadata: Metadata = {
	title: "ciber/blog",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={GeistSans.className}>
				<Header />
				{children}

				<Toaster />
			</body>
		</html>
	);
}
