import { api } from "@/lib/api/axios";

export type Content = {
	id: string;
	slug: string;
	title: string;
	body: string;
	author_id: string;
	owner_username: string;
	status: "published" | "deleted";
	published_at: string;
	updated_at: string;
	deleted_at: string | null;
};

interface GetContentRequest {
	user: string;
	slug: string;
}

interface GetContentResponse {
	content: Content;
}

export async function getContent({
	user,
	slug,
}: GetContentRequest): Promise<GetContentResponse> {
	const endpoint = `/contents/${user}/${slug}`;

	const { data: content } = await api.get(endpoint);

	return { content };
}
