import { api } from "@/lib/api/axios";
import type { Content } from "./get-content";

export type PaginationProps = {
	page: number;
	perPage: number;
	nextPage: number | null;
	previousPage: number | null;
	lastPage: number;
	firstPage: number;
	contentsFound: number;
};

interface FetchRecentContentsRequest {
	page?: number;
	limit?: number;
}

interface FetchRecentContentsResponse {
	pagination: PaginationProps;
	contents: Omit<Content, "body">[];
}

export async function fetchRecentContents(
	paginationProps?: FetchRecentContentsRequest,
): Promise<FetchRecentContentsResponse> {
	const { data } = await api.get("/contents", {
		params: paginationProps ? getPaginationParams(paginationProps) : undefined,
	});

	return data;
}

function getPaginationParams(props: FetchRecentContentsRequest) {
	const params = new URLSearchParams();
	props.limit && params.append("limit", String(props.limit));
	props.page && params.append("page", String(props.page));

	return params;
}
