import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";

export type UserProfile = {
	id: string;
	email: string;
	username: string;
	created_at: string;
	updated_at: string;
};

interface GetUserProfileRequest {
	username: string;
}

export async function getUserProfile({ username }: GetUserProfileRequest) {
	const endpoint = `/users/${username}`;

	try {
		const { data: profile } = await api.get<UserProfile>(endpoint);
		return nice({ profile });
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 404) {
				return bad(
					Fail.create("RESOURCE_NOT_FOUND", {
						message: "Usuário não encontrado.",
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
