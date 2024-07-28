import { getUserProfile } from "@/app/actions/users/get-user";
import { PageContainer } from "@/components/page-container";
import { ProfileTabs } from "@/components/profile-tabs";
import { notFound } from "next/navigation";

interface Params {
	username: string;
}

export default async function UserProfile({
	params: { username },
}: { params: Params }) {
	const [error, response] = await getUserProfile({ username });

	if (error) {
		switch (error.code) {
			case "RESOURCE_NOT_FOUND":
				return notFound();

			case "INTERNAL_SERVER_ERROR":
				throw new Error(error?.payload.message);
		}
	}

	const { profile } = response;

	return (
		<PageContainer className="border-l space-y-4">
			<h1 className="text-3xl font-medium">{profile.username}</h1>

			<ProfileTabs />
		</PageContainer>
	);
}
