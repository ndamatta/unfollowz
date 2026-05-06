import { getTranslations, setRequestLocale } from "next-intl/server";
import CTA from "@/src/components/CTA";
import Processor from "@/src/components/Processor";
import FAQSection from "@/src/components/FAQSection";
import Breadcrumb from "@/src/components/Breadcrumb";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
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