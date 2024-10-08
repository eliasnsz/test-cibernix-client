import { fetchContentsByUsername } from "@/app/actions/contents/fetch-contents-by-username";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderSearchIcon } from "lucide-react";
import Link from "next/link";

interface Params {
	params: {
		username: string;
	};
}

export default async function UserContents({ params }: Params) {
	const { username } = params;

	const { contents, pagination } = await fetchContentsByUsername({
		username,
		paginationProps: {
			limit: 10,
		},
	});

	return (
		<Tabs defaultValue="contents" className="w-full">
			<TabsList>
				<Link href={`/${username}`}>
					<TabsTrigger value="profile">Perfil</TabsTrigger>
				</Link>
				<Link href={`/${username}/conteudos`}>
					<TabsTrigger value="contents">Publicações</TabsTrigger>
				</Link>
			</TabsList>
			<TabsContent value="contents">
				<PageContainer className="py-2">
					<ContentList
						contents={contents}
						pagination={pagination}
						paginationBasePath={`/${username}/conteudos/pagina`}
						emptyStateIcon={FolderSearchIcon}
						emptyStateTitle="Nenhuma publicação encontrada"
						emptyStateSubtitle={`${username} ainda não fez nenhuma publicação`}
					/>
				</PageContainer>
			</TabsContent>
		</Tabs>
	);
}
