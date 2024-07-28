"use client";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ProfileTabs() {
	const searchParams = useSearchParams();
	const tabs = ["profile", "contents"];
	const paramsDefaultTab = searchParams.get("tab") ?? "profile";
	const defaultTab = tabs.includes(paramsDefaultTab)
		? paramsDefaultTab
		: "profile";

	return (
		<Tabs defaultValue={defaultTab} className="w-[400px]">
			<TabsList>
				<TabsTrigger value="profile">Perfil</TabsTrigger>
				<TabsTrigger value="contents">Publicações</TabsTrigger>
			</TabsList>
			<TabsContent value="profile">
				Make changes to your account here.
			</TabsContent>
			<TabsContent value="contents">Change your password here.</TabsContent>
		</Tabs>
	);
}
