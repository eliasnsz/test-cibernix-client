import type { PaginationProps } from "@/app/actions/contents/fetch-recent-contents";
import type { Content } from "@/app/actions/contents/get-content";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ContentsPagination } from "./contents-pagination";
import { Button } from "./ui/button";

interface ContentListProps {
	pagination: PaginationProps;
	contents: Omit<Content, "body">[];
	paginationBasePath: string;
}

export default async function ContentList({
	contents,
	pagination,
	paginationBasePath,
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
							className="font-medium hover:underline hover:text-muted-foreground line-clamp-1"
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
								— 0 comentários — {dayjs(content.published_at).fromNow()}
							</span>
						</div>
					</li>
				))}
			</ol>

			{pagination.page === pagination.lastPage && (
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

			<ContentsPagination
				pagination={pagination}
				paginationBasePath={paginationBasePath}
			/>
		</>
	);
}
