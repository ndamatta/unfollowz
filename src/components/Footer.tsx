import { Link } from "@/src/i18n/navigations";
import { getTranslations } from "next-intl/server";
import { GITHUB_URL } from "@/src/lib/config";

export default async function Footer() {
  const t = await getTranslations("footer.links");
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center py-3 bg-zinc-900">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-base text-zinc-300 px-2 py-1 hover:scale-105 transition-transform">
          {t("home")}
        </Link>
        <Link href="/about" className="text-base text-zinc-300 px-2 py-1 hover:scale-105 transition-transform">
          {t("about")}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-zinc-400">©{year}</p>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          ndamatta
        </a>
      </div>
    </footer>
  );
}
