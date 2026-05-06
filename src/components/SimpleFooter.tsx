import Link from "next/link";

export default function SimpleFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center py-3 bg-zinc-900">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-base text-zinc-300 px-2 py-1 hover:scale-105 transition-transform">
          Home
        </Link>
        <Link href="/about" className="text-base text-zinc-300 px-2 py-1 hover:scale-105 transition-transform">
          About
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-zinc-400">&copy;{year}</p>
        <a href="https://github.com/ndamatta" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          ndamatta
        </a>
      </div>
    </footer>
  );
}
