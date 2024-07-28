import Link from "next/link";

export default function NotFound() {
	return (
		<main className="grid place-items-center h-screen max-h-[calc(100vh-56px)]">
			<div className="text-center space-y-4 mb-12">
				<h6 className="text-4xl font-bold">404</h6>
				<h1 className="text-2xl font-semibold">Página não encontrada</h1>
				<Link
					className="block text-violet-700 underline hover:text-violet-500 transition-colors"
					href="/"
				>
					Retornar à tela inicial
				</Link>
			</div>
		</main>
	);
}
