import { PageContainer } from "@/components/page-container";
import { ProfileTabs } from "@/components/profile-tabs";
import axios from "axios";

interface Params {
	user: string;
}

export default async function UserProfile({
	params: { user },
}: { params: Params }) {
	const { data } = await axios.get(
		`https://www.tabnews.com.br/api/v1/users/${user}`,
	);

	return (
		<PageContainer className="border-l space-y-4">
			<h1 className="text-3xl font-medium">{data.username}</h1>

			<ProfileTabs />
		</PageContainer>
	);
}
