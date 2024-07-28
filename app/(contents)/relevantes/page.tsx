import { PageContainer } from "@/components/page-container";
import { api } from "@/lib/api/axios";
import axios from "axios";
import Link from "next/link";

export default async function Relevants() {
	const { data: contents } = await api.get("/contents");
	return (
		<PageContainer>
			<ol className="list-decimal space-y-4">
				{contents.map((content: Record<string, string>) => (
					<li key={content.id} className="-space-y-1">
						<Link
							href={`/${content.owner_username}/${content.slug}`}
							className="font-medium hover:underline hover:text-muted-foreground line-clamp-1"
						>
							{content.title}
						</Link>
						<div>
							<span className="text-xs text-muted-foreground">
								<Link href="#" className="hover:underline">
									{content.owner_username}
								</Link>{" "}
								— 0 comentários — 16 horas atrás
							</span>
						</div>
					</li>
				))}
			</ol>
		</PageContainer>
	);
}
