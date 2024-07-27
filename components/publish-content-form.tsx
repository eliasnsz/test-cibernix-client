"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

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

const formSchema = z.object({
	title: z.string().min(1, { message: "Campo obrigatório" }),
	body: z.string().min(1, { message: "Campo obrigatório" }),
});

export function PublishContentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			body: "",
		},
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((a) => {
					alert(JSON.stringify(a));
				})}
				className="space-y-6"
			>
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
								<div className="overflow-hidden border rounded-md">
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
					<Button variant="ghost">
						<Link href="..">Cancelar</Link>
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}
