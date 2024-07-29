import { getUserProfile } from "@/app/actions/users/get-user";
import { PageContainer } from "@/components/page-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
	params: {
		username: string;
	};
}

export default async function UserProfileLayout({ children, params }: Props) {
	const { username } = params;

	const [error, response] = await getUserProfile({ username });

	if (error) {
		notFound();
	}

	return (
		<PageContainer className="border-l space-y-4">
			<h1 className="text-3xl font-medium">{username}</h1>
			{children}
		</PageContainer>
	);
}
