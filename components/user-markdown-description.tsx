"use client";

import { useState } from "react";
import MarkdownViewer from "./markdown-viewer";
import { Button } from "./ui/button";
import { MarkdownEditor } from "./markdown-editor";
import type { UserProfile } from "@/app/actions/users/get-user";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/app/actions/users/update-user";
import { useToast } from "./ui/use-toast";
import { LoaderIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

interface Props {
	isProfileOwner: boolean;
	user: UserProfile;
}

export function UserMarkdownDescription({
	isProfileOwner,
	user: { description, ...user },
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const { toast } = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const [mode, setMode] = useState<"view" | "edit">("view");
	const [newDescription, setNewDescription] = useState(description || "");

	function handleCancel() {
		setMode("view");
		setNewDescription(description);
	}

	async function handleSave() {
		setIsLoading(true);
		if (!user) return router.push("sign-in");

		const [error] = await updateUser({
			description: newDescription,
		});

		if (error) {
			switch (error.code) {
				case "RESOURCE_NOT_FOUND":
				case "INTERNAL_SERVER_ERROR":
					setIsLoading(false);
					setMode("view");
					return toast({
						title: "Erro ao atualizar a descrição",
						description: error.payload.message,
						variant: "destructive",
					});
			}
		}

		toast({
			title: "Atualização feita",
			description: "A descrição do seu perfil foi atualizada com sucesso",
		});

		setIsLoading(false);
		setMode("view");
		router.refresh();
	}

	const isDescriptionEmpty = description.trim().length <= 0;

	return (
		<div className="my-4">
			{isProfileOwner && isDescriptionEmpty && mode === "view" && (
				<div className="grid place-items-center">
					<Button
						variant="outline"
						size="sm"
						className="font-medium"
						onClick={() => setMode("edit")}
					>
						Criar descrição
					</Button>
				</div>
			)}

			{!isDescriptionEmpty && (
				<div className="flex items-center justify-between">
					<span className="font-semibold text-sm">Descrição:</span>
					{isProfileOwner && (
						<Button
							size="sm"
							variant="ghost"
							onClick={() => setMode("edit")}
							className="text-xs text-violet-600 hover:text-violet-700 transition-colors hover:bg-violet-100 font-semibold"
						>
							Editar descrição
						</Button>
					)}
				</div>
			)}

			<div>
				{mode === "view" ? (
					!isDescriptionEmpty && (
						<div className="px-4 py-2 my-1 border rounded-lg">
							<MarkdownViewer value={newDescription || description} />
						</div>
					)
				) : (
					<>
						<div className="my-1">
							<MarkdownEditor
								preview="edit"
								defaultValue={description}
								value={newDescription}
								height={200}
								onChange={(e) => setNewDescription(e as string)}
							/>
						</div>
						<div className="my-4 justify-end flex gap-2">
							<Button
								disabled={isLoading}
								onClick={handleCancel}
								type="button"
								variant="ghost"
							>
								Cancelar
							</Button>
							<Button onClick={handleSave} disabled={isLoading}>
								{isLoading ? (
									<LoaderIcon className="size-4 animate-spin" />
								) : (
									"Salvar"
								)}
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
