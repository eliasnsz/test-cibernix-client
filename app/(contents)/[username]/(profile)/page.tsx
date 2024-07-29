import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Params {
	params: {
		username: string;
	};
}

export default async function UserProfile({ params }: Params) {
	const { username } = params;

	return (
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
	);
}
