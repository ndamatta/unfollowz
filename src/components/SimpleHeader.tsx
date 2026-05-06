import Link from "next/link";

export default function SimpleHeader() {
  return (
    <header className="w-full bg-gradient-to-l from-zinc-950 to-zinc-800">
      <div className="container mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold text-slate-100 tracking-tight hover:text-rose-400 transition-colors duration-200"
        >
          unfollow
          <span className="font-sketch text-rose-400 text-xl sm:text-2xl">
            z
          </span>
        </Link>
      </div>
    </header>
  );
}