"use client";

import { useRouter } from "@/src/i18n/navigations";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900 mb-4">
        Something went wrong
      </h1>
      <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => {
          reset();
          router.refresh();
        }}
        className="px-6 py-2 rounded-xl bg-zinc-900 text-slate-100 text-sm sm:text-base font-medium hover:bg-zinc-800 hover:border-rose-400 border transition-all duration-200"
      >
        Try again
      </button>
    </div>
  );
}
