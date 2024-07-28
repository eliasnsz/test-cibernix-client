import { getContent } from "@/app/actions/contents/get-content";
import MarkdownViewer from "@/components/markdown-viewer";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import Link from "next/link";

interface Params {
	username: string;
	slug: string;
}

export default async function Content({ params }: { params: Params }) {
	const { username, slug } = params;
	const { content } = await getContent({ username, slug });

	return (
		<PageContainer className="border-l space-y-6">
			<div className="space-y-2">
				<div>
					<Link href={`/${content.owner_username}`}>
						<Badge
							variant="outline"
							className="text-violet-800 font-medium hover:underline bg-violet-100"
						>
							{content.owner_username}
						</Badge>
					</Link>
					<span className="text-xs text-muted-foreground">
						{" "}
						— {dayjs(content.published_at).fromNow()}
					</span>
				</div>

				<h1 className="text-3xl font-bold">{content.title}</h1>
			</div>

			<MarkdownViewer value={content.body} />
		</PageContainer>
	);
}
