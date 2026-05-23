import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/src/components/Breadcrumb";
import type { Metadata } from "next";
import { SITE_URL, GITHUB_URL, PORTFOLIO_URL } from "@/src/lib/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "about",
  });

  const baseUrl = SITE_URL;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
      url: `${baseUrl}/${locale}/about`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        es: `${baseUrl}/es/about`,
      },
    },
  };
}

export default async function About({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className="flex flex-col flex-1 bg-slate-100">
      {/* tasty breadcrumbs */}
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-2xl">
        <Breadcrumb
          items={[
            { label: t("common.nav.home"), href: "/" },
            { label: t("about.title") },
          ]}
        />
      </div>

      {/* hero */}
      <section className="text-center py-12 px-4">
        <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900">
          {t("about.title")}
          <span className="font-sketch text-rose-400 text-3xl sm:text-4xl md:text-5xl">
            .
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-prose mx-auto leading-relaxed whitespace-pre-line">
          {t("about.description")}
        </p>
      </section>

      {/* content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-14 max-w-2xl space-y-10">

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            {t("about.sections.vision.title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
            {t("about.sections.vision.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            {t("about.sections.privacy.title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
            {t("about.sections.privacy.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            {t("about.sections.opensource.title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
            {t("about.sections.opensource.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            {t("about.sections.simple.title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
            {t("about.sections.simple.description")}
          </p>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">
            {t("about.sections.developer.title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
            {t("about.sections.developer.description")}
          </p>
        </div>

        {/* warning */}
        <div className="rounded-2xl border border-rose-300 bg-rose-50 px-1 py-1">
          <p className="text-xs sm:text-sm text-rose-700 text-center leading-relaxed">
            {t("about.sections.warning.description")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-zinc-900 text-slate-100 text-sm sm:text-base font-medium border border-slate-700 hover:bg-zinc-800 hover:border-rose-400 transition-all duration-200"
          >
            {t("about.cta.github")}
          </a>

          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 text-zinc-900 text-sm sm:text-base font-medium border border-slate-300 hover:bg-slate-300 transition-all duration-200"
          >
            {t("about.cta.portfolio")}
          </a>
        </div>
      </div>
    </div>
  );
}