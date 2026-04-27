import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div className="bg-slate-500">
      <h1>{t("title")}</h1>
    </div>
  );
}