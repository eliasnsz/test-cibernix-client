"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import cookies from "js-cookie";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { LoaderIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Content as ContentProps } from "@/app/actions/contents/get-content";
import type { Dispatch, SetStateAction } from "react";

interface Props {
	content: ContentProps;
	setMode: Dispatch<SetStateAction<"view" | "edit">>;
}

const formSchema = z.object({
	title: z.string().min(1, { message: "Campo obrigatório" }),
	body: z.string().min(1, { message: "Campo obrigatório" }),
});

export function EditContentForm({ content, setMode }: Props) {
	const pathname = usePathname();
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: content.title,
			body: content.body,
		},
	});

	async function onSubmit({ title, body }: z.infer<typeof formSchema>) {
		try {
			const { data } = await api.put(
				`/contents/${content.owner_username}/${content.slug}`,
				{ title, body, contentId: content.id },
				{ headers: { Authorization: `Bearer ${cookies.get("token")}` } },
			);

			toast({
				title: "Conteúdo atualizado",
				description:
					"Sua publicação foi atualizada e está visível para os outros usuários!",
			});

			if (data.redirect_path !== pathname) {
				router.push(data.redirect_path);
			} else {
				setMode("view");
				router.refresh();
			}
			revalidatePath("/");
			revalidatePath(`${content.owner_username}/${content.slug}`);
			revalidatePath(data.redirect_path);
		} catch (error) {
			if (error instanceof AxiosError) {
				toast({
					title: "Erro ao atualizar conteúdo",
					description: error.response?.data.message,
					variant: "destructive",
				});

				if (error.response?.status === 401) {
					router.push("/sign-in");
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título:</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Conteúdo da publicação:</FormLabel>
							<FormControl>
								<div className="focus-within:border-black overflow-hidden border border-input rounded-lg">
									<MDEditor
										height={350}
										data-color-mode="light"
										previewOptions={{
											rehypePlugins: [[rehypeSanitize]],
										}}
										value={field.value}
										onChange={field.onChange}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-2">
					<Button
						disabled={form.formState.isSubmitting}
						type="button"
						variant="ghost"
						onClick={() => setMode("view")}
					>
						Cancelar
					</Button>
					<Button
						disabled={form.formState.isSubmitting || !form.formState.isDirty}
						type="submit"
					>
						{form.formState.isSubmitting ? (
							<LoaderIcon className="size-4 animate-spin" />
						) : (
							"Salvar"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
