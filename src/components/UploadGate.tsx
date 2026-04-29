import { getTranslations } from "next-intl/server";

export default async function UploadGate() {
  const t = await getTranslations("Home.UploadGate");
  return (
    <section className="w-full text-center bg-linear-to-r from-zinc-950 to-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-slate-200 font-bold mb-6 -translate-y-1/5">
          {t("title")}
          <span className="font-sketch text-rose-400 text-4xl sm:text-5xl md:text-6xl">
            s
          </span>
        </h1>
        <div className="text-center text-sm sm:text-base md:text-lg text-slate-100 max-w-[75ch] mx-auto mb-4 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p className="text-xs sm:text-sm text-red-400 mt-3"><span>ⓘ</span> {t("p3")}</p>
        </div>
      </div>
    </section>
  );
}
