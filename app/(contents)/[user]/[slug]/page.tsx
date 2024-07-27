import MarkdownViewer from "@/components/markdown-viewer";
import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Link from "next/link";

interface Params {
	user: string;
	slug: string;
}

export default async function Content({
	params: { slug, user },
}: { params: Params }) {
	const { data } = await axios.get(
		`https://www.tabnews.com.br/api/v1/contents/${user}/${slug}`,
	);

	return (
		<PageContainer className="border-l space-y-6">
			<div className="space-y-2">
				<div>
					<Link href={`/${data.owner_username}`}>
						<Badge
							variant="outline"
							className="text-violet-800 hover:underline bg-violet-100"
						>
							{data.owner_username}
						</Badge>
					</Link>
					<span className="text-xs text-muted-foreground">
						{" "}
						— 18 horas atrás
					</span>
				</div>

				<h1 className="text-3xl font-semibold">{data.title}</h1>
			</div>

			<MarkdownViewer value={data.body} />
		</PageContainer>
	);
}
