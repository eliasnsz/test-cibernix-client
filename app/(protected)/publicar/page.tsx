import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import { PageContainer } from "@/components/page-container";
import { PublishContentForm } from "@/components/publish-content-form";
import { redirect } from "next/navigation";

export default async function Publicar() {
	const [error, response] = await getAuthenticatedUser();

	if (error) {
		switch (error.code) {
			case "UNAUTHENTICATED":
			case "INTERNAL_SERVER_ERROR":
				return redirect("/sign-in");
		}
	}

	return (
		<PageContainer className="max-w-4xl ">
			<h1 className="text-3xl font-semibold">Novo conteúdo</h1>

			<div className="mt-6">
				<PublishContentForm />
			</div>
		</PageContainer>
	);
}
