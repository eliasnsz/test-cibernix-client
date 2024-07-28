import AuthenticationForm from "@/components/authentication-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SignIn() {
	const isAuthenticated = cookies().has("token");

	if (isAuthenticated) {
		return redirect("/");
	}

	return (
		<div className="grid max-h-[calc(100vh-56px)] h-screen place-items-center">
			<div className="max-w-96">
				<div className="space-y-2 mb-6 text-center">
					<h1 className="text-2xl font-semibold">Fazer login</h1>
					<p className="text-muted-foreground text-sm">
						Bem-vindo de volta, insira e-mail e senha para entrar.
					</p>
				</div>

				<AuthenticationForm />
			</div>
		</div>
	);
}
