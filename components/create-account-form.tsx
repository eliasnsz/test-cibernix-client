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
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const { username, email, password } = values;

		try {
			await api.post("/users", { username, email, password });

			toast({
				title: "Conta criada com sucesso!",
				description: "Vamos redirecionar você para a tela de login",
			});

			router.push(`/sign-in?email=${email}`);
		} catch (error) {
			if (error instanceof AxiosError) {
				switch (error.response?.status) {
					case 400:
					case 409:
						toast({
							title: "Erro ao criar conta",
							description: error.response?.data.message,
							variant: "destructive",
						});
						break;

					default:
						toast({
							title: "Ocorreu um erro inesperado",
							description: "Entre em contato com os desenvolvedores",
							variant: "destructive",
						});
						break;
				}
			}
		}
	}

	return (
		<>
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

			<div className="text-center space-y-3.5 mt-4">
				<p className="text-sm text-muted-foreground">
					Já tem uma conta?{" "}
					<Link
						href="/sign-in"
						className="text-primary underline hover:text-black"
					>
						Faça login
					</Link>
				</p>
				<p className="text-center max-w-80 mx-auto text-xs text-muted-foreground">
					Ao criar uma conta, você concorda com os nossos{" "}
					<Link href="#" className="underline">
						Termos de Serviço
					</Link>{" "}
					e a{" "}
					<Link href="#" className="underline">
						Política de Privacidade.
					</Link>
				</p>
			</div>
		</>
	);
}
