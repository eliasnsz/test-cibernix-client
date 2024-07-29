import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";
import cookies from "js-cookie";

export type UserProfile = {
	id: string;
	email: string;
	description: string;
	username: string;
	created_at: string;
	updated_at: string;
};

interface GetUserProfileRequest {
	description?: string;
}

export async function updateUser({ description }: GetUserProfileRequest) {
	const token = cookies.get("token");
	const endpoint = "/user";

	try {
		await api.put(
			endpoint,
			{ description },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return nice();
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
