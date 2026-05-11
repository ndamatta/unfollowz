import { getTranslations, setRequestLocale } from "next-intl/server";
import CTA from "@/src/components/CTA";
import Processor from "@/src/components/Processor";
import FAQSection from "@/src/components/FAQSection";
import Breadcrumb from "@/src/components/Breadcrumb";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.cta" });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://unfollowz.com";
  return {
    title: t("headline"),
    description: t("subheadline"),
    openGraph: {
      title: t("headline"),
      description: t("subheadline"),
      type: "website",
      locale,
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("headline"),
      description: t("subheadline"),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const faqItems = t.raw("home.faq.items");

  return (
    <>
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[{ label: t("common.nav.home") }]} />
      </div>
      <CTA />
      <Processor />
      <FAQSection items={faqItems} variant="flat" subtitle={t("home.faq.subtitle")} cta={true} />
    </>
  );
}
