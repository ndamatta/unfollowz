import { getTranslations, setRequestLocale } from "next-intl/server";
import CTA from "@/src/components/CTA";
import UploadGate from "@/src/components/UploadGate";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
    <CTA />
    <UploadGate />  
    </>
  );
}