"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigations";

export default function SelectLanguage() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    router.push(pathName, { locale: newLocale });
  };

  return (
    <select aria-label="Select language" className="text-sm text-rose-400 ml-4 px-1 rounded-xl bg-transparent border border-transparent hover:bg-rose-400 hover:text-zinc-800 hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none" onChange={(e) => changeLanguage(e.target.value)} value={currentLocale}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
