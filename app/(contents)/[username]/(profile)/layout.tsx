import { PageContainer } from "@/components/page-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	params: {
		username: string;
	};
}

export default function UserProfileLayout({ children, params }: Props) {
	const { username } = params;

	return (
		<PageContainer className="border-l space-y-4">
			<h1 className="text-3xl font-medium">{username}</h1>
			{children}
		</PageContainer>
	);
}
