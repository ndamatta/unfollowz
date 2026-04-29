import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function CTA() {
  const t = await getTranslations("Home.CTA");
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      {/* logo */}
      <div className="mb-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-zinc-950 font-bold mb-4">
        unfollow<span className="font-sketch text-rose-400 text-6xl sm:text-7xl md:text-8xl">z</span>
      </h1>

      {/* sub */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-2">
        {t("p1")}
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        {t("p2")}
      </p>

      {/* button */}
      <button className="px-6 py-3 rounded-2xl bg-rose-400 text-slate-100 text-base sm:text-lg font-medium hover:scale-105 hover:text-zinc-950 transition">
        {t("button")}
      </button>
    </section>
  );
}