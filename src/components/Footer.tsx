import { Link } from '../i18n/navigations';
import { getTranslations } from "next-intl/server";

export default async function Footer() {
    const t = await getTranslations('Footer');
    const year = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center justify-center py-3 bg-slate-200">
            {/* links */}
            <div className="flex items-center gap-5">
                <Link href="/" className="text-base text-zinc-950 px-2 py-1 hover:scale-105 transition-transform">
                    {t("home")}
                </Link>
                <Link href="/about" className="text-base text-zinc-950 px-2 py-1 hover:scale-105 transition-transform">
                    {t("about")}
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-sm text-zinc-950">©{year}</p>
                <Link href="https://github.com/ndamatta" className="text-sm text-zinc-950">ndamatta</Link>
            </div>
        </footer>
    );
};