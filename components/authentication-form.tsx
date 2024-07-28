"use client";
import { api } from "@/lib/api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import cookies from "react-cookies";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import Router from "next/router";

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
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: searchParams.get("email") ?? "",
			password: "",
			rememberMe: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { email, password, rememberMe } = values;

		try {
			const response = await api.post("/sessions", {
				email,
				password,
			});
			const token = response.data.access_token;

			cookies.save("token", token, {
				expires: rememberMe
					? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30) // 30 days
					: undefined, // Session
			});

			toast({
				title: "Sucesso!",
				description: "O login foi efetuado. Seja bem-vindo!",
			});

			window.location.href = "/relevantes";
		} catch (error) {
			if (error instanceof AxiosError) {
				toast({
					title: "Erro ao fazer login",
					description: error.response?.data.message,
				});
			}
		}
	}

	return (
		<>
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

			<div className="text-center space-y-3.5 mt-4">
				<p className="text-sm text-muted-foreground">
					Não tem uma conta?{" "}
					<Link
						href="/sign-up"
						className="text-primary underline hover:text-black"
					>
						Cadastre-se
					</Link>
				</p>
			</div>
		</>
	);
}
