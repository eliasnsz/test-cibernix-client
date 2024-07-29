import { getAuthenticatedUser } from "@/app/actions/users/get-authenticated-user";
import { getUserProfile } from "@/app/actions/users/get-user";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMarkdownDescription } from "@/components/user-markdown-description";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
	params: {
		username: string;
	};
}

export default async function UserProfile({ params }: Params) {
	const { username } = params;

	const [, getUserResponse] = await getUserProfile({ username });
	const [, getAuthenticatedUserResponse] = await getAuthenticatedUser();

	const isProfileOwner =
		getAuthenticatedUserResponse?.user.id === getUserResponse?.profile.id;

	if (!getUserResponse) {
		notFound();
	}

	return (
		<>
			<Tabs defaultValue="profile" className="w-full">
				<TabsList>
					<Link href={`/${username}`}>
						<TabsTrigger value="profile">Perfil</TabsTrigger>
					</Link>
					<Link href={`/${username}/conteudos`}>
						<TabsTrigger value="contents">Publicações</TabsTrigger>
					</Link>
				</TabsList>
			</Tabs>

			<UserMarkdownDescription
				isProfileOwner={isProfileOwner}
				user={getUserResponse.profile}
			/>
		</>
	);
}
