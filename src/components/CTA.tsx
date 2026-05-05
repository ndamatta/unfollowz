import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function CTA() {
  const t = await getTranslations("home.cta");
  const tActions = await getTranslations("common.actions");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Image
          src="/logo.webp"
          alt="unfollowz logo"
          width={120}
          height={120}
          priority
        />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl text-zinc-950 font-bold mb-4">
        unfollow<span className="font-sketch text-rose-400 text-6xl sm:text-7xl md:text-8xl">z</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-2">
        {t("headline")}
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        {t("subheadline")}
      </p>

      
      <a className="px-6 py-3 rounded-2xl bg-rose-400 text-slate-100 text-base sm:text-lg font-medium hover:scale-105 hover:text-zinc-950 transition" href="#processor">  
        {tActions("getStarted")}
      </a>
    </section>
  );
}