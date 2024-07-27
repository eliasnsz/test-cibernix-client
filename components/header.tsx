import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MainNavbar } from "./main-navbar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ProfileDropdown } from "./profile-dropdown";

export function Header() {
	return (
		<header className="w-full min-h-14 space-x-16 flex items-center px-6 sticky top-0 backdrop-blur-sm	border-b">
			<Link
				href="/"
				className="flex hover:opacity-65 transition-opacity items-center"
			>
				<Image
					className="size-6"
					src="/assets/logo-80x80.svg"
					width={80}
					height={80}
					alt="logo"
				/>
				<span className="text-base mb-0.5 tracking-tighter font-bold">
					ciber/blog
				</span>
			</Link>
			<MainNavbar />

			<div className="w-full flex justify-end">
				<ProfileDropdown />
			</div>
		</header>
	);
}
