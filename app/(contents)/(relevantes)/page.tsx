import { fetchRecentContents } from "@/app/actions/contents/fetch-recent-contents";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";

export default async function Relevants() {
	const { contents, pagination } = await fetchRecentContents();

	return (
		<PageContainer>
			<ContentList
				contents={contents}
				pagination={pagination}
				paginationBasePath="/pagina"
			/>
		</PageContainer>
	);
}
