"use server";
import { cookies } from "next/headers";
import { bad, Fail, nice } from "@/errors/bad-nice";
import { api } from "@/lib/api/axios";
import type { UserProfile } from "./get-user";

export async function getAuthenticatedUser() {
	const token = cookies().get("token");

	if (!token) {
		return bad(
			Fail.create("UNAUTHENTICATED", { message: "Você não está autenticado" }),
		);
	}

	try {
		const { data: user } = await api.get<UserProfile>("/user", {
			headers: { Authorization: `Bearer ${token.value}` },
		});
		return nice({ user });
	} catch (error) {
		if (!token) {
			return bad(
				Fail.create("UNAUTHENTICATED", {
					message: "Você não está autenticado",
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
