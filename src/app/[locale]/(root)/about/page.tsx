import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/src/components/Breadcrumb";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-2xl">
        <Breadcrumb
          items={[
            { label: t("common.nav.home"), href: "/" },
            { label: t("about.title") },
          ]}
        />
      </div>

      <section className="text-center py-12 px-4">
        <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900">
          {t("about.title")}
          <span className="font-sketch text-rose-400 text-3xl sm:text-4xl md:text-5xl">
            .
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-900 mt-3 max-w-prose mx-auto">
          {t("about.description")}
        </p>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 max-w-2xl space-y-10">

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
            {t("about.sections.what.title")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-900 mt-2 leading-relaxed">
            {t("about.sections.what.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
            {t("about.sections.privacy.title")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-900 mt-2 leading-relaxed">
            {t("about.sections.privacy.description")}
          </p>

          <ul className="mt-3 text-sm text-zinc-900 space-y-1 list-disc list-inside">
            <li>{t("about.sections.privacy.points.noLogin")}</li>
            <li>{t("about.sections.privacy.points.noAccess")}</li>
            <li>{t("about.sections.privacy.points.noStorage")}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
            {t("about.sections.how.title")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-900 mt-2 leading-relaxed">
            {t("about.sections.how.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
            {t("about.sections.transparency.title")}
          </h2>
          <p className="text-sm sm:text-base text-zinc-900 mt-2 leading-relaxed">
            {t("about.sections.transparency.description")}
          </p>

          <p className="text-xs sm:text-sm text-red-500 mt-3 font-bold">
            <span>ⓘ</span> {t("about.sections.transparency.warning")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/ndamatta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-zinc-900 text-slate-100 text-sm sm:text-base font-medium border hover:bg-zinc-800 hover:border-rose-400 transition-all duration-200"
          >
            {t("about.cta.github")}
          </a>

          <a
            href="https://www.ndamatta.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-200 text-zinc-900 text-sm sm:text-base font-medium border border-slate-300 hover:bg-slate-300 transition-all duration-200"
          >
            {t("about.cta.portfolio")}
          </a>
        </div>
      </div>
    </div>
  );
}
