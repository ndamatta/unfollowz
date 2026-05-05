import { getTranslations, setRequestLocale } from "next-intl/server";
import FAQSection from "@/src/components/FAQSection";

export default async function HowItWorks({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations();

  const faqItems = t.raw("howItWorks.faq.items");
  const steps = t.raw("howItWorks.steps");

  return (
    <div className="flex flex-col flex-1 bg-slate-100">
      
      <section className="text-center py-12 px-4">
        <h1 className="text-2xl sm:text-4xl font-semibold text-zinc-900">
          {t("howItWorks.title")}
          <span className="font-sketch text-rose-400 text-3xl sm:text-2xl md:text-5xl">
            .
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {t("howItWorks.meta")}
        </p>
      </section>

      {/* instructionss */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* video */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-300">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/asdasd"
              title={t("howItWorks.videoTitle")}
              allowFullScreen
            />
          </div>

          {/* steps */}
          <div className="space-y-5">
            {steps.map((step: any, i: number) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-zinc-900">
                  <span className="text-rose-400 font-bold">
                    {i + 1}.
                  </span>{" "}
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FAQSection
        items={faqItems}
        variant="accordion"
        subtitle={t("howItWorks.faq.subtitle")}
        cta={false}
      />
    </div>
  );
}