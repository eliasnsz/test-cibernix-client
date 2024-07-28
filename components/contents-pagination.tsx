import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { PaginationProps } from "@/app/actions/contents/fetch-recent-contents";

interface ContentsPaginationProps {
	pagination: PaginationProps;
	paginationBasePath: string;
}

export function ContentsPagination({
	pagination,
	paginationBasePath,
}: ContentsPaginationProps) {
	const nextPageHref = pagination.nextPage
		? `${paginationBasePath}/${pagination.nextPage}`
		: "";
	const previousPageHref = pagination.previousPage
		? `${paginationBasePath}/${pagination.previousPage}`
		: "";

	return (
		<Pagination className="mt-8">
			<PaginationContent>
				<PaginationItem>
					{pagination.previousPage ? (
						<Link href={previousPageHref}>
							<Button variant="ghost">
								<ChevronLeftIcon className="size-4 mr-1.5" />
								Anterior
							</Button>
						</Link>
					) : (
						<Button disabled variant="ghost">
							<ChevronLeftIcon className="size-4 mr-1.5" />
							Anterior
						</Button>
					)}
				</PaginationItem>
				<PaginationItem>
					<span className="text-sm mx-4 font-semibold">{pagination.page}</span>
				</PaginationItem>
				<PaginationItem>
					{pagination.nextPage ? (
						<Link href={nextPageHref}>
							<Button variant="ghost">
								Próximo
								<ChevronRightIcon className="size-4 mr-1.5" />
							</Button>
						</Link>
					) : (
						<Button disabled variant="ghost">
							Próximo
							<ChevronRightIcon className="size-4 mr-1.5" />
						</Button>
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
