import { fetchContentsByUsername } from "@/app/actions/contents/fetch-contents-by-username";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Params {
	params: {
		username: string;
		page: string;
	};
}

export default async function UserContentsPagination({ params }: Params) {
	const { username, page } = params;

	const { contents, pagination } = await fetchContentsByUsername({
		username,
		paginationProps: {
			page: Number.parseInt(page),
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
				<PageContainer>
					<ContentList
						contents={contents}
						pagination={pagination}
						paginationBasePath={`/${username}/conteudos/pagina`}
					/>
				</PageContainer>
			</TabsContent>
		</Tabs>
	);
}
