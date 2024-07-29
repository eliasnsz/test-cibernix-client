"use client";
import { deleteContent } from "@/app/actions/contents/delete-content";
import type { Content as ContentProps } from "@/app/actions/contents/get-content";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { EditIcon, TrashIcon } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { EditContentForm } from "./edit-content-form";
import MarkdownViewer from "./markdown-viewer";
import { Badge } from "./ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

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
	const { toast } = useToast();
	const router = useRouter();
	const pathname = usePathname();
	const [mode, setMode] = useState<"view" | "edit">("view");

	async function handleDelete() {
		const [error] = await deleteContent({
			contentId: content.id,
			username: content.owner_username,
		});

		if (error) {
			switch (error.code) {
				case "NOT_ALLOWED":
				case "RESOURCE_NOT_FOUND":
				case "INTERNAL_SERVER_ERROR":
					return toast({
						title: "Ocorreu um erro",
						description: error.payload.message,
						variant: "destructive",
					});
			}
		}

		toast({
			title: "Conteúdo removido",
			description: "A publicação foi removida com sucesso.",
		});

		router.refresh();
	}

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
									<DropdownMenuItem
										onClick={handleDelete}
										className="cursor-pointer"
									>
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
