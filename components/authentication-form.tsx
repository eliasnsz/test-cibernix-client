"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "Campo obrigatório",
		})
		.email({
			message: "Insira um e-mail válido",
		}),
	password: z.string().min(1, {
		message: "Campo obrigatório",
	}),
	rememberMe: z.boolean().default(false),
});

export default function AuthenticationForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	async function onSubmit() {
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="pb-1.5">
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="rememberMe"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-2 space-y-0 py-1.5">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel className="text-secondary-foreground text-sm">
								Permanecer conectado
							</FormLabel>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="size-4 animate-spin" />
					) : (
						"Fazer Login"
					)}
				</Button>
			</form>
		</Form>
	);
}
