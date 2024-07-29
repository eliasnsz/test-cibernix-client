import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import CreateAccountForm from "@/components/create-account-form";
import { redirect } from "next/navigation";

export default async function SignUp() {
	const [error, response] = await getAuthenticatedUser();

	if (response?.user) {
		return redirect("/");
	}

	return (
		<div className="grid h-full place-items-center">
			<div className="max-w-96">
				<div className="space-y-2 mb-6 text-center">
					<h1 className="text-2xl font-semibold">Criar uma nova conta</h1>
					<p className="text-muted-foreground text-sm">
						Insira seu e-mail e senha para criar uma nova conta.
					</p>
				</div>

				<CreateAccountForm />
			</div>
		</div>
	);
}
