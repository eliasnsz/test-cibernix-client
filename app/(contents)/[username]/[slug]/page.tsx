import { getContent } from "@/app/actions/contents/get-content";
import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import { Content } from "@/components/content";
import { PageContainer } from "@/components/page-container";
import { notFound } from "next/navigation";

interface Params {
	username: string;
	slug: string;
}

export default async function ContentPage({ params }: { params: Params }) {
	const [_, getAuthenticatedUserResponse] = await getAuthenticatedUser();

	const { username, slug } = params;
	const [error, getContentResponse] = await getContent({ username, slug });

	if (error) {
		switch (error.code) {
			case "RESOURCE_NOT_FOUND":
			case "INTERNAL_SERVER_ERROR":
				return notFound();
		}
	}

	const isContentOwner = !!(
		getAuthenticatedUserResponse?.user &&
		getAuthenticatedUserResponse.user.id ===
			getContentResponse.content.author_id
	);

	return (
		<PageContainer className="border-l space-y-2">
			<Content
				mode="view"
				content={getContentResponse.content}
				isContentOwner={isContentOwner}
			/>
		</PageContainer>
	);
}
