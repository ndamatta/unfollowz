"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/navigations";
import SelectLanguage from "./SelectLanguage";

type MobileMenuProps = {
  home: string;
  howItWorks: string;
  about: string;
};

export default function MobileMenu({ home, howItWorks, about }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "block w-full text-center text-rose-400 px-4 py-2 rounded-xl hover:bg-rose-400 hover:text-zinc-800 transition-all duration-200";

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        className="flex flex-col gap-1.5 p-2"
      >
        <span
          className={`block w-5 h-0.5 bg-rose-400 transition-all duration-200 ${isOpen ? "translate-y-2 opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-rose-400 transition-all duration-200 ${isOpen ? "scale-y-150" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-rose-400 transition-all duration-200 ${isOpen ? "-translate-y-2 opacity-0" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full bg-zinc-950 border-t border-zinc-800 py-4 px-4 flex flex-col items-center gap-2 z-50">
          <Link href="/" className={linkClass} onClick={() => setIsOpen(false)}>
            {home}
          </Link>
          <Link href="/howitworks" className={linkClass} onClick={() => setIsOpen(false)}>
            {howItWorks}
          </Link>
          <Link href="/about" className={linkClass} onClick={() => setIsOpen(false)}>
            {about}
          </Link>
          <SelectLanguage />
        </div>
      )}
    </div>
  );
}
