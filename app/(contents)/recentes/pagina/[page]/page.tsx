import { fetchRecentContents } from "@/app/actions/contents/fetch-recent-contents";
import ContentList from "@/components/content-list";
import { PageContainer } from "@/components/page-container";
import { FolderSearchIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface Params {
	page: string;
}

export default async function RecentsPage({ params }: { params: Params }) {
	const page = Number.parseInt(params.page);

	if (page < 0 || Number.isNaN(page)) {
		return notFound();
	}

	const { contents, pagination } = await fetchRecentContents({
		page: page,
	});

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
