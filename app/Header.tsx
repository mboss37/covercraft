import Link from "next/link";

export default function Header() {
    return (
            <header className="flex items-center w-full h-16">
                <div className="relative flex w-full px-10 mx-auto max-w-screen-2xl">
                    <Link href="/" >
                        <h1 className="text-2xl font-medium text-gray-700 sm:text-4xl">
                            cv-gpt.com
                        </h1>
                        <div className="absolute top-0 sm:left-60 left-44">
                            <span className="text-xs text-blue-500 sm:text-base">BETA</span>
                        </div>
                    </Link>
                </div>
            </header>
    );
}