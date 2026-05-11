"use client";
import { useState, useRef } from "react";
import DropZonePair, { DropZonePairRef } from "./DropZonePair";
import ResultsSection from "./ResultsSection";
import { processFiles, ProcessResult } from "@/src/lib/processFiles";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigations";

export default function Processor() {
  const t = useTranslations("home.processor");
  const dropRef = useRef<DropZonePairRef>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async (followers: File, following: File) => {
    setError(null);
    setResult(null);

    try {
      const [followersText, followingText] = await Promise.all([
        followers.text(),
        following.text(),
      ]);
      setResult(processFiles(JSON.parse(followersText), JSON.parse(followingText)));
    } catch {
      dropRef.current?.reset();
      setError(t("error"));
    }
  };

  return (
    <>
      <section id="processor" className="w-full text-center bg-linear-to-b from-zinc-950 to-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-slate-200 font-bold mb-6 -translate-y-1/5">
            {t("title")}
            <span className="font-sketch text-rose-400 text-4xl sm:text-5xl md:text-6xl">s</span>
          </h2>
          <div className="text-center text-sm sm:text-base md:text-lg text-slate-100 max-w-[75ch] mx-auto mb-8 leading-relaxed">
            <p>{t("steps")}</p>
            <Link className="hover:underline hover:text-rose-400 transition duration-300" href="/howitworks">{t("guide")}<span className="font-bold text-rose-400">.</span> </Link>
            <p>{t("time")}</p>
            <p className="text-xs sm:text-sm text-red-500 mt-3">
              <span aria-hidden="true">ⓘ</span> {t("privacy")}
            </p>
          </div>
          <DropZonePair ref={dropRef} onBothReady={handleProcess} />
          {error && <p className="mt-6 text-sm text-red-500">{error}</p>}
        </div>
      </section>

      <section>
        {result && <ResultsSection result={result} />}
      </section>
    </>
  );
}
