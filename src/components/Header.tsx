import Image from "next/image";
import { Link } from "@/src/i18n/navigations";
import SelectLanguage from "./SelectLanguage";
import MobileMenu from "./MobileMenu";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("common.nav");

  return (
    <header className="relative w-full bg-gradient-to-l from-zinc-950 to-zinc-800">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">

        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold text-slate-100 tracking-tight hover:text-rose-400 transition-colors duration-200"
        >
          unfollow
          <span className="font-sketch text-rose-400 text-xl sm:text-2xl">
            z
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-2 sm:gap-4">
          <Link href="/" className="text-sm sm:text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-800 hover:scale-105 hover:shadow-md transition-all duration-200">
            {t("home")}
          </Link>
          <Link href="/howitworks" className="text-sm sm:text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-800 hover:scale-105 hover:shadow-md transition-all duration-200">
            {t("howItWorks")}
          </Link>
          <Link href="/about" className="text-sm sm:text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-800 hover:scale-105 hover:shadow-md transition-all duration-200">
            {t("about")}
          </Link>
          <SelectLanguage />
        </nav>

        <MobileMenu
          home={t("home")}
          howItWorks={t("howItWorks")}
          about={t("about")}
        />

      </div>
    </header>
  );
}
