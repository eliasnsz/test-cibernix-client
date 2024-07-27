import CreateAccountForm from "@/components/create-account-form";
import Link from "next/link";

export default function SignUp() {
	return (
		<div className="grid min-h-screen place-items-center">
			<div className="max-w-96">
				<div className="space-y-2 mb-6 text-center">
					<h1 className="text-2xl font-semibold">Criar uma nova conta</h1>
					<p className="text-muted-foreground text-sm">
						Insira seu e-mail e senha para criar uma nova conta.
					</p>
				</div>

				<CreateAccountForm />

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
			</div>
		</div>
	);
}
