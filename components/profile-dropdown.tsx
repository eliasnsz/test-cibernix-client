import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import { cn } from "@/lib/utils";
import { Menu, NotebookPen, PlusIcon, User2Icon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import type { ElementType } from "react";
import { LogoutButton } from "./logout-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export async function ProfileDropdown() {
	const [error, response] = await getAuthenticatedUser();

	if (!response?.user) {
		return <AuthenticateButtons />;
	}

	return (
		<Popover>
			<PopoverTrigger>
				<div className="border p-1.5 rounded border-border hover:bg-muted">
					<Menu className="w-5 h-5" />
				</div>
			</PopoverTrigger>

			<PopoverContent className="max-w-48 mr-6 p-2">
				<PopoverButton
					text={response.user.username}
					href={`/${response.user.username}`}
					icon={User2Icon}
				/>

				<hr className="my-0.5" />

				<PopoverButton href="/publicar" icon={PlusIcon} text="Novo conteúdo" />
				<PopoverButton
					href={`/${response.user.username}?tab=contents`}
					icon={NotebookPen}
					text="Meus conteúdos"
				/>

				<hr className="my-0.5" />

				<LogoutButton />
			</PopoverContent>
		</Popover>
	);
}

interface PopoverButtonProps extends LinkProps {
	icon: ElementType;
	className?: string;
	text: string;
}

function PopoverButton({
	icon: Icon,
	className,
	text,
	...props
}: PopoverButtonProps) {
	return (
		<Link
			{...props}
			className={cn(
				"p-2 hover:bg-muted transition-colors rounded flex items-center gap-2",
				className,
			)}
		>
			<Icon className="size-4" />
			<span className="text-sm">{text}</span>
		</Link>
	);
}

export function AuthenticateButtons() {
	return (
		<ul className="flex gap-4 text-sm font-semibold">
			<li>
				<Link
					href="/sign-in"
					className="hover:text-muted-foreground transition-colors"
				>
					Login
				</Link>
			</li>
			<li>
				<Link
					href="/sign-up"
					className="hover:text-muted-foreground transition-colors"
				>
					Cadastrar
				</Link>
			</li>
		</ul>
	);
}
