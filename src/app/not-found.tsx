import SimpleHeader from "@/src/components/SimpleHeader";
import SimpleFooter from "@/src/components/SimpleFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-zinc-950">
      <SimpleHeader />

      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">404</h1>
        <p className="text-lg sm:text-xl text-zinc-900 mb-2">Page not found</p>
        <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="px-6 py-2 rounded-xl bg-zinc-900 text-slate-100 text-sm sm:text-base font-medium hover:bg-zinc-800 hover:border-rose-400 border transition-all duration-200"
        >
          Back to home
        </a>
      </main>

      <SimpleFooter />
    </div>
  );
}
