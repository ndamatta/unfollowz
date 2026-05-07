"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigations";

type FAQItem = {
  q: string;
  a: string;
};

type FAQVariant = "flat" | "accordion";

function FlatItem({ item }: { item: FAQItem }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-3 border border-rose-400">
      <h3 className="text-sm sm:text-base font-semibold text-slate-300">
        {item.q}
      </h3>
      <p className="text-xs sm:text-sm text-slate-100 mt-1 leading-relaxed whitespace-pre-line">
        {item.a}
      </p>
    </div>
  );
}

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-5 py-4 bg-zinc-900 text-left text-slate-100 text-sm sm:text-base font-medium hover:bg-linear-to-tr from-zinc-950 to-zinc-800 transition-colors duration-200"
      >
        <span>{item.q}</span>
        <span
          className={`text-rose-400 text-lg transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <div id={panelId} role="region" className="px-5 py-4 bg-zinc-900 text-slate-200 text-xs sm:text-sm leading-relaxed border-rose-400 border-b whitespace-pre-line">
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FAQSection({
  items,
  variant,
  subtitle,
  cta,
}: {
  items: FAQItem[];
  variant: FAQVariant;
  subtitle: string;
  cta: boolean;
}) {
  const t = useTranslations("home.faq");
  return (
    <section className="w-full bg-slate-100 my-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0 my-20 max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-3xl font-semibold text-zinc-900">
            FAQ
            <span className="font-sketch text-rose-400 text-2xl sm:text-4xl md:text-5xl">
              s
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-700">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {items.map((item, index) =>
            variant === "flat" ? (
              <FlatItem key={item.q} item={item} />
            ) : (
              <AccordionItem key={item.q} item={item} index={index} />
            ),
          )}
        </div>

        {cta && (
          <div className="text-center mt-6">
            <Link
              href="/howitworks"
              className="text-sm sm:text-base text-zinc-900 hover:text-zinc-800 transition-colors duration-200"
            >
              {t("cta")} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
