import { fetchRecentContents } from "@/app/actions/contents/fetch-recent-contents";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";
import { FolderSearchIcon } from "lucide-react";

export default async function Recents() {
	const { contents, pagination } = await fetchRecentContents();

	return (
		<PageContainer>
			<ContentList
				contents={contents}
				pagination={pagination}
				paginationBasePath="/recentes/pagina"
				emptyStateIcon={FolderSearchIcon}
				emptyStateSubtitle="Seja o primeiro a publicar!"
				emptyStateTitle="Nenhuma publicação encontrada"
			/>
		</PageContainer>
	);
}
