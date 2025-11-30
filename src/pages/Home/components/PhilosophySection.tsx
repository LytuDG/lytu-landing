import { Code } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PhilosophySection() {
  const { t } = useTranslation();

  return (
    <section
      id="filosofía"
      className="py-24 bg-gradient-to-b from-slate-900/30 to-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700 text-cyan-300 text-xs font-semibold uppercase tracking-wide">
              {t("philosophy.badge")}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:justify-between gap-8 md:gap-20">
            <div className="text-center md:text-left md:max-w-2xl w-full md:w-auto">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-snug">
                {t("philosophy.title1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {t("philosophy.title2")}
                </span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg">
                {t("philosophy.subtitle")}
              </p>
            </div>

            <div className="w-full md:hidden flex items-center justify-center mt-6">
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-md w-full max-w-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div>
                    <div className="text-sm text-slate-300 font-semibold">
                      {t("philosophy.teamCard.name")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t("philosophy.teamCard.role")}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "{t("philosophy.teamCard.quote")}"
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-start justify-end w-96">
              <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-md w-80">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div>
                    <div className="text-sm text-slate-300 font-semibold">
                      {t("philosophy.teamCard.name")}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t("philosophy.teamCard.role")}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "{t("philosophy.teamCard.quote")}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6">
              <div className="flex-1 max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    <Code size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">
                      {t("philosophy.process.title")}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {t("philosophy.process.subtitle")}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block mt-6">
                  <div className="relative">
                    <div className="absolute left-0 right-0 top-6 h-0.5 bg-slate-800/60" />
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex flex-col items-center text-center w-1/3 px-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white mb-3">
                          1
                        </div>
                        <div className="font-semibold">
                          {t("philosophy.process.step1.title")}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {t("philosophy.process.step1.description")}
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center w-1/3 px-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white mb-3">
                          2
                        </div>
                        <div className="font-semibold">
                          {t("philosophy.process.step2.title")}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {t("philosophy.process.step2.description")}
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center w-1/3 px-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white mb-3">
                          3
                        </div>
                        <div className="font-semibold">
                          {t("philosophy.process.step3.title")}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {t("philosophy.process.step3.description")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-80">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-900/20 to-cyan-900/10 border border-slate-800 p-6">
                  <div className="text-slate-300 text-sm">
                    {t("philosophy.mvpCard.title")}
                  </div>
                  <div className="mt-6">
                    <div className="text-4xl font-extrabold text-white">
                      {t("philosophy.mvpCard.mvp")}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {t("philosophy.mvpCard.subtitle")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-8 w-full">
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-700">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div className="font-semibold text-base">
                      {t("philosophy.process.step1.title")}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm ml-14">
                    {t("philosophy.process.step1.description")}
                  </div>
                </div>

                <div className="pb-4 border-b border-slate-700">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div className="font-semibold text-base">
                      {t("philosophy.process.step2.title")}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm ml-14">
                    {t("philosophy.process.step2.description")}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div className="font-semibold text-base">
                      {t("philosophy.process.step3.title")}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm ml-14">
                    {t("philosophy.process.step3.description")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
