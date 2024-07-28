import { fetchRecentContents } from "@/app/actions/contents/fetch-recent-contents";
import { PageContainer } from "@/components/page-container";
import dayjs from "dayjs";
import Link from "next/link";

export default async function Relevants() {
	const { contents } = await fetchRecentContents();

	return (
		<PageContainer>
			<ol className="list-decimal space-y-2">
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
		</PageContainer>
	);
}
