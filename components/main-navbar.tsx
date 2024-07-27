"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavbar() {
	const pathname = usePathname();

	return (
		<div className="text-sm font-semibold space-x-4">
			<Link
				href="/relevantes"
				className={` transition-colors
					${
						pathname === "/relevantes"
							? "border-b text-primary pb-0.5 border-muted-foreground"
							: "text-muted-foreground"
					}`}
			>
				Relevantes
			</Link>
			<Link
				href="/recentes"
				className={` transition-colors
					${
						pathname === "/recentes"
							? "border-b text-primary pb-0.5 border-muted-foreground"
							: "text-muted-foreground"
					}`}
			>
				Recentes
			</Link>
		</div>
	);
}
