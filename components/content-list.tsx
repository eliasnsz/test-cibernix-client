import type { PaginationProps } from "@/app/actions/contents/fetch-recent-contents";
import type { Content } from "@/app/actions/contents/get-content";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ElementType } from "react";
import { ContentsPagination } from "./contents-pagination";
import moment from "moment";

interface ContentListProps {
	pagination: PaginationProps;
	contents: Omit<Content, "body">[];
	paginationBasePath: string;
	emptyStateIcon?: ElementType;
	emptyStateTitle: string;
	emptyStateSubtitle: string;
}

export default async function ContentList({
	contents,
	pagination,
	paginationBasePath,
	emptyStateIcon: EmptyStateIcon,
	emptyStateTitle,
	emptyStateSubtitle,
}: ContentListProps) {
	if (pagination.page > pagination.lastPage) {
		return redirect(`${paginationBasePath}/${pagination.lastPage}`);
	}

	return (
		<>
			<ol
				start={pagination.perPage * (pagination.page - 1) + 1}
				className="list-decimal space-y-2"
			>
				{contents.map((content) => (
					<li key={content.id} className="-space-y-1">
						<Link
							href={`/${content.owner_username}/${content.slug}`}
							className="font-medium visited:text-muted-foreground hover:underline hover:text-muted-foreground line-clamp-1"
						>
							{content.title}
						</Link>
						<div>
							<span className="text-xs text-muted-foreground">
								<Link
									href={`/${content.owner_username}`}
									className="hover:underline"
								>
									{content.owner_username}
								</Link>{" "}
								— 0 comentários — {moment(content.published_at).fromNow()}
							</span>
						</div>
					</li>
				))}
			</ol>

			{!!contents.length && pagination.page === pagination.lastPage && (
				<Link className="hover:underline" href={`${paginationBasePath}/1`}>
					<div className="my-4 text-violet-600">
						<span className="block text-base font-semibold">
							Fim dos conteúdos.
						</span>
						<span className="block text-sm font-light">
							Por hoje é só! Clique para voltar ao início.
						</span>
					</div>
				</Link>
			)}

			{!contents.length && (
				<div className="flex items-center flex-col gap-1 py-6">
					{EmptyStateIcon && <EmptyStateIcon className="size-12" />}
					<h6 className="text-xl font-semibold">{emptyStateTitle}</h6>
					<p className="text-muted-foreground">{emptyStateSubtitle}</p>
				</div>
			)}

			<ContentsPagination
				pagination={pagination}
				paginationBasePath={paginationBasePath}
			/>
		</>
	);
}
