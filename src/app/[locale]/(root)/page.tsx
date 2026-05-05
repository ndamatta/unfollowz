import { getTranslations, setRequestLocale } from "next-intl/server";
import CTA from "@/src/components/CTA";
import Processor from "@/src/components/Processor";
import FAQSection from "@/src/components/FAQSection";

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
    <CTA />
    <Processor />
    <FAQSection items={faqItems} variant="flat" subtitle={t("home.faq.subtitle")} cta={true} />
    </>
  );
}