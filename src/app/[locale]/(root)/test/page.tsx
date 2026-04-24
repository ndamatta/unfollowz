import { getTranslations, setRequestLocale } from "next-intl/server";



export default async function Test({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('Test');
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <h1>
        {t("title")}
      </h1>
      <p>
        {t("description")}
      </p>
    </div>
  );
}
