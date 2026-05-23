import { getTranslations, setRequestLocale } from "next-intl/server";

type FAQStep = {
  title: string;
  description: string;
};
import FAQSection from "@/src/components/FAQSection";
import Breadcrumb from "@/src/components/Breadcrumb";
import type { Metadata } from "next";
import { SITE_URL } from "@/src/lib/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  const baseUrl = SITE_URL;
  return {
    title: t("title"),
    description: t("meta"),
    openGraph: {
      title: t("title"),
      description: t("meta"),
      type: "website",
      locale,
      url: `${baseUrl}/${locale}/howitworks`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("meta"),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/howitworks`,
      languages: {
        en: `${baseUrl}/en/howitworks`,
        es: `${baseUrl}/es/howitworks`,
      },
    },
  };
}

export default async function HowItWorks({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  const faqItems = t.raw("howItWorks.faq.items");
  const steps = t.raw("howItWorks.steps");

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-5xl">
        <Breadcrumb
          items={[
            { label: t("common.nav.home"), href: "/" },
            { label: t("howItWorks.title") },
          ]}
        />
      </div>

      <section className="text-center py-12 px-4">
        <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900">
          {t("howItWorks.title")}
          <span className="font-sketch text-rose-400 text-3xl sm:text-4xl md:text-5xl">
            .
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {t("howItWorks.meta")}
        </p>
      </section>

      {/* instructions */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* video */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-300">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/asdasd"
              title={t("howItWorks.videoTitle")}
              allowFullScreen
            />
          </div>

          {/* steps */}
          <div className="space-y-5">
            {steps.map((step: FAQStep, i: number) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-zinc-900">
                  <span className="text-rose-400 font-bold">
                    {i + 1}.
                  </span>{" "}
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FAQSection
        items={faqItems}
        variant="accordion"
        subtitle={t("howItWorks.faq.subtitle")}
        cta={false}
        namespace="howItWorks.faq"
      />
    </div>
  );
}
