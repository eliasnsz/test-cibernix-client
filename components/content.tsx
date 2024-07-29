"use client";
import type { Content as ContentProps } from "@/app/actions/contents/get-content";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import moment from "moment";
import "moment/locale/pt-br";
import Link from "next/link";
import { useState } from "react";
import MarkdownViewer from "./markdown-viewer";
import { PublishContentForm } from "./publish-content-form";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EditContentForm } from "./edit-content-form";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EditIcon, TrashIcon } from "lucide-react";

moment.locale("pt-br");

interface Props {
	mode: "view" | "edit";
	content: ContentProps;
	isContentOwner: boolean;
}

export function Content({
	mode: defaultMode = "view",
	content,
	isContentOwner,
}: Props) {
	const [mode, setMode] = useState<"view" | "edit">("view");

	if (mode === "view") {
		return (
			<>
				<div className="flex items-start justify-between">
					<div>
						<Link href={`/${content.owner_username}`}>
							<Badge
								variant="outline"
								className="text-violet-800 font-medium hover:underline bg-violet-100"
							>
								{content.owner_username}
							</Badge>
						</Link>
						<span className="text-xs text-muted-foreground">
							{" "}
							— {moment(content.published_at).fromNow()}
						</span>
					</div>
					{isContentOwner && (
						<div className="">
							<DropdownMenu>
								<DropdownMenuTrigger className="border grid place-items-center rounded-lg size-8">
									<DotsHorizontalIcon className="size-5 text-muted-foreground" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => setMode("edit")}
										className="cursor-pointer"
									>
										<EditIcon className="size-4 mr-2" />
										<span>Editar</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										<TrashIcon className="size-4 mr-2 text-red-500" />
										<span className="text-red-500">Deletar</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</div>
				<h1 className="text-3xl font-bold">{content.title}</h1>
				<MarkdownViewer value={content.body} />
			</>
		);
	}
	return <EditContentForm content={content} setMode={setMode} />;
}
