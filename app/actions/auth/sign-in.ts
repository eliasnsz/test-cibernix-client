import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import { AxiosError } from "axios";
import cookies from "js-cookie";

interface SignInRequest {
	email: string;
	password: string;
	rememberMe?: boolean;
}

interface SignInResponse {
	access_token: string;
}

export async function signIn({
	email,
	password,
	rememberMe = false,
}: SignInRequest) {
	try {
		const {
			data: { access_token },
		} = await api.post<SignInResponse>("/sessions", { email, password });

		cookies.set("token", access_token, {
			expires: rememberMe
				? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30) // 30 days
				: undefined, // Session
		});

		return nice({ access_token });
	} catch (error) {
		if (error instanceof AxiosError) {
			return bad(
				Fail.create("BAD_REQUEST", {
					message: error.response?.data.message,
				}),
			);
		}
	}

	return bad(
		Fail.create("INTERNAL_SERVER_ERROR", {
			message: "Ocorreu um erro inesperado",
		}),
	);
}
