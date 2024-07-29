import Image from "next/image";
import { PageContainer } from "./page-container";
import Link from "next/link";

export function Footer() {
	return (
		<footer>
			<PageContainer className="border-t my-12 flex gap-8 justify-between">
				<div className="flex text-muted-foreground text-sm items-center gap-1">
					<Image
						src="/assets/logo-80x80.png"
						alt="logo"
						width={32}
						height={32}
						className="opacity-60"
					/>
					<span>&copy; 2024 ciberblog</span>
				</div>
				<div className="flex flex-1 justify-around items-center">
					<FooterLink label="Contato" />
					<FooterLink label="FAQ" />
					<FooterLink label="Github" />
					<FooterLink label="Sobre" />
					<FooterLink label="Termos de uso" />
					<FooterLink label="Políticas de Privacidade" />
				</div>
			</PageContainer>
		</footer>
	);
}

function FooterLink({ label }: { label: string }) {
	return (
		<Link
			href="#"
			className="text-sm hover:underline hover:text-violet-800 text-violet-500"
		>
			{label}
		</Link>
	);
}
