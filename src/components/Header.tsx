import { Link } from '../i18n/navigations';
import { SelectLanguage } from './SelectLanguage';
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations('Header');

  return (
    <header className="bg-linear-to-l from-zinc-950 to-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-1 py-4">

        {/* logo */}
        <div className="text-xl">
          LogoHere
        </div>

        {/* nav */}
        <nav className="flex items-center gap-5">
          <Link href="/" className="text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-950 hover:scale-105 hover:shadow-lg transition">
            {t("home")}
          </Link>
          <Link href="/howitworks" className="text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-950 hover:scale-105 hover:shadow-lg transition">
            {t("how-it-works")}
          </Link>
          <Link href="/about" className="text-base text-rose-400 px-2 py-1 rounded-xl hover:bg-rose-400 hover:text-zinc-950 hover:scale-105 hover:shadow-lg transition">
            {t("about")}
          </Link>
          <SelectLanguage />
        </nav>

      </div>
    </header>
  );
};