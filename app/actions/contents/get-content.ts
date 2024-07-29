import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";

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
	username: string;
	slug: string;
}

export async function getContent({ username, slug }: GetContentRequest) {
	const endpoint = `/contents/${username}/${slug}`;

	try {
		const { data: content } = await api.get<Content>(endpoint);

		return nice({ content });
	} catch (error) {
		if (error instanceof AxiosError) {
			switch (error.response?.status) {
				case 404:
					return bad(
						Fail.create("RESOURCE_NOT_FOUND", {
							message: error.response.data.message,
						}),
					);
			}
		}

		return bad(
			Fail.create("INTERNAL_SERVER_ERROR", {
				message: "Ocorreu um erro inesperado.",
			}),
		);
	}
}
