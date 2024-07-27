import AuthenticationForm from "@/components/authentication-form";
import Link from "next/link";

export default function SignIn() {
	return (
		<div className="grid min-h-screen place-items-center">
			<div className="max-w-96">
				<div className="space-y-2 mb-6 text-center">
					<h1 className="text-2xl font-semibold">Fazer login</h1>
					<p className="text-muted-foreground text-sm">
						Bem-vindo de volta, insira e-mail e senha para entrar.
					</p>
				</div>

				<AuthenticationForm />

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
			</div>
		</div>
	);
}
