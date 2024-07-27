import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

interface ContainerProps extends ComponentProps<"div"> {}

export function PageContainer({ className, ...props }: ContainerProps) {
	return <main className={cn("max-w-3xl p-8 mx-auto", className)} {...props} />;
}
