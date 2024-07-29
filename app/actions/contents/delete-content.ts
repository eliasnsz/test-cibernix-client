import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";
import cookies from "js-cookie";

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

interface DeleteContentRequest {
	username: string;
	contentId: string;
}

export async function deleteContent({
	username,
	contentId,
}: DeleteContentRequest) {
	const token = cookies.get("token");
	const endpoint = `/contents/${username}/${contentId}`;

	try {
		await api.delete(endpoint, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return nice();
	} catch (error) {
		if (error instanceof AxiosError) {
			switch (error.response?.status) {
				case 403:
					return bad(
						Fail.create("NOT_ALLOWED", {
							message: error.response.data.message,
						}),
					);
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
