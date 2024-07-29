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
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
	title: z.string().min(1, { message: "Campo obrigatório" }),
	body: z.string().min(1, { message: "Campo obrigatório" }),
});

export function PublishContentForm() {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	async function onSubmit({ title, body }: z.infer<typeof formSchema>) {
		try {
			const { data } = await api.post(
				"/contents",
				{ title, body },
				{ headers: { Authorization: `Bearer ${cookies.get("token")}` } },
			);

			toast({
				title: "Conteúdo publicado",
				description: "Sua publicação já está visível para os outros usuários!",
			});

			router.push(data.redirect_path);
			revalidatePath("/");
		} catch (error) {
			if (error instanceof AxiosError) {
				toast({
					title: "Erro ao publicar conteúdo",
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
					<Button disabled={form.formState.isSubmitting} variant="ghost">
						<Link href="..">Cancelar</Link>
					</Button>
					<Button disabled={form.formState.isSubmitting} type="submit">
						{form.formState.isSubmitting ? (
							<LoaderIcon className="size-4 animate-spin" />
						) : (
							"Publicar"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
