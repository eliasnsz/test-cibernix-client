import { fetchRecentContents } from "@/app/actions/contents/fetch-recent-contents";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";

export default async function Recents() {
	const { contents, pagination } = await fetchRecentContents();

	return (
		<PageContainer>
			<ContentList
				contents={contents}
				pagination={pagination}
				paginationBasePath="/recentes/pagina"
			/>
		</PageContainer>
	);
}
