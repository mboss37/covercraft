import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center min-h-screen p-24">
			<div className="px-5 mt-20 space-y-10 text-center text-gray-700 sm:max-w-4xl sm:mt-40">
				<h3 className="text-3xl font-bold md:text-5xl line-height-1">
					Erstelle dein Bewerbungsschreiben mit{" "}
					<span className="text-blue-500">chatGPT</span> in Sekunden
				</h3>
			</div>
      <Link
          href="/workflow"
					className="px-5 py-4 mt-10 transition-colors border-transparent rounded-lg group hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
				>
					<h2 className={`text-lg font-semibold`}>
						Los Geht's{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
				</Link>
		</main>
	);
}
