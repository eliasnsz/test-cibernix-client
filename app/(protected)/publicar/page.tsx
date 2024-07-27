import { PageContainer } from "@/components/page-container";
import { PublishContentForm } from "@/components/publish-content-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Publicar() {
	const isAuthenticated = cookies().has("token");

	if (!isAuthenticated) {
		return redirect("/sign-in");
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
