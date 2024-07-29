import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import AuthenticationForm from "@/components/authentication-form";
import { redirect } from "next/navigation";

export default async function SignIn() {
	const [error, response] = await getAuthenticatedUser();

	if (response?.user) {
		return redirect("/");
	}

	return (
		<div className="grid h-full place-items-center">
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
