import {
	LogOutIcon,
	Menu,
	NotebookPen,
	PlusIcon,
	User2Icon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link, { type LinkProps } from "next/link";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export function ProfileDropdown() {
	return (
		<Popover>
			<PopoverTrigger>
				<div className="border p-1.5 rounded border-border hover:bg-muted">
					<Menu className="w-5 h-5" />
				</div>
			</PopoverTrigger>

			<PopoverContent className="max-w-48 mr-6 p-2">
				<PopoverButton href="/eliasnsz" icon={User2Icon} text="eliasnsz" />

				<hr className="my-0.5" />

				<PopoverButton href="/publicar" icon={PlusIcon} text="Novo conteúdo" />
				<PopoverButton href="#" icon={NotebookPen} text="Meus conteúdos" />

				<hr className="my-0.5" />

				<PopoverButton
					href="#"
					text="Deslogar"
					className="text-destructive"
					icon={LogOutIcon}
				/>
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
