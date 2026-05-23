import { GITHUB_URL } from "@/src/lib/config";

export default function SimpleFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center py-3 bg-zinc-900">
      <div className="flex items-center gap-2">
        <p className="text-sm text-zinc-400">&copy;{year}</p>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          ndamatta
        </a>
      </div>
    </footer>
  );
}
