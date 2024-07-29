import { api } from "@/lib/api/axios";
import type { Content } from "./get-content";
import type { PaginationProps } from "./fetch-recent-contents";

type PaginationRequestProps = {
	page?: number;
	limit?: number;
};

interface FetchContentsByUsernameRequest {
	username: string;
	paginationProps?: PaginationRequestProps;
}

interface FetchContentsByUsernameResponse {
	pagination: PaginationProps;
	contents: Omit<Content, "body">[];
}

export async function fetchContentsByUsername({
	username,
	paginationProps,
}: FetchContentsByUsernameRequest): Promise<FetchContentsByUsernameResponse> {
	const { data } = await api.get(`/contents/${username}`, {
		params: paginationProps ? getPaginationParams(paginationProps) : undefined,
	});

	return data;
}

function getPaginationParams(props: PaginationRequestProps) {
	const params = new URLSearchParams();
	props.limit && params.append("limit", String(props.limit));
	props.page && params.append("page", String(props.page));

	return params;
}
