import { api } from "@/lib/api/axios";

type Content = {
	id: string;
	slug: string;
	title: string;
	author_id: string;
	owner_username: string;
	status: "published" | "deleted";
	published_at: string;
	updated_at: string;
	deleted_at: string | null;
};

interface FetchRecentContentsRequest {
	page?: number;
	limit?: number;
}

interface FetchRecentContentsResponse {
	contents: Content[];
}

export async function fetchRecentContents(
	paginationProps?: FetchRecentContentsRequest,
): Promise<FetchRecentContentsResponse> {
	const { data: contents } = await api.get("/contents", {
		params: paginationProps ? getPaginationParams(paginationProps) : undefined,
	});

	return { contents };
}

function getPaginationParams(props: FetchRecentContentsRequest) {
	const params = new URLSearchParams();
	props.limit && params.append("limit", String(props.limit));
	props.page && params.append("page", String(props.page));
}
