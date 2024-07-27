"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
	username: z
		.string()
		.min(4, { message: "O nome de usuário deve conter no mínimo 6 caracteres" })
		.refine((username) => /^[a-z0-9]+$/i.test(username), {
			message: "O nome deve conter apenas letras e numeros",
		}),
	email: z.string().email({
		message: "Insira um e-mail válido",
	}),
	password: z.string().min(6, {
		message: "A senha deve conter no mínimo 6 caracteres",
	}),
});

export default function CreateAccountForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
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
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome de usuário</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="size-4 animate-spin" />
					) : (
						"Criar conta"
					)}
				</Button>
			</form>
		</Form>
	);
}
