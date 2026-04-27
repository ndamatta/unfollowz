import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  return (

    <div className="flex flex-col flex-1 items-center justify-center bg-slate-100">

      <h1>
        {t("title")}
      </h1>
      <p>
        {t("description")}
      </p>
    </div>
  );
}
