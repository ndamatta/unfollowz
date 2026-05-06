import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigations";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-4 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-4">404</h1>
      <p className="text-lg sm:text-xl text-zinc-900 mb-2">{t("title")}</p>
      <p className="text-sm sm:text-base text-slate-500 mb-8 max-w-md">{t("description")}</p>
      <Link
        href="/"
        className="px-6 py-2 rounded-xl bg-zinc-900 text-slate-100 text-sm sm:text-base font-medium hover:bg-zinc-800 hover:border-rose-400 border transition-all duration-200"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}