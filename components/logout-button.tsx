"use client";
import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export function LogoutButton() {
	const router = useRouter();

	function logout() {
		cookies.remove("token");
		window.location.reload();
	}

	return (
		<Button
			variant="ghost"
			onClick={() => logout()}
			className={
				"p-2 hover:bg-muted text-red-600 hover:text-red-600 transition-colors rounded flex items-center gap-2"
			}
		>
			<LogOutIcon className="size-4" />
			<span className="text-sm">Logout</span>
		</Button>
	);
}
