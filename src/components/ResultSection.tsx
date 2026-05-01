"use client";
import { useState } from "react";
import { IGUser, ProcessResult } from "@/src/lib/processFiles";
import { useTranslations } from "next-intl";

function StatsBar({
  followingCount,
  followersCount,
  notFollowingBack,
}: ProcessResult) {
  const t = useTranslations("Home.ResultSection");

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
      {[
        { label: t("followers"), value: followersCount },
        { label: t("notFollowingBack"), value: notFollowingBack.length },
        { label: t("following"), value: followingCount },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-zinc-800 rounded-2xl px-4 py-5 shadow-lg"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-400">
            {value}
          </span>
          <span className="text-xs sm:text-sm text-slate-400 mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function UserList({ users }: { users: IGUser[] }) {
  const t = useTranslations("Home.ResultSection");

  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-2xl">
      <input
        type="text"
        placeholder={t("searchUser")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 border border-slate-600 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-rose-400 transition-colors duration-200"
      />
      <ul className="flex flex-col gap-2">
        {filtered.map((u) => (
          <li
            key={u.username}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800 shadow text-sm sm:text-base"
          >
            <span className="text-slate-200">{u.username}</span>
            <a
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-300 transition-colors duration-200"
            >
              {t("seeProfile")}
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-6">
            {t("noResults")}
          </p>
        )}
      </ul>
    </div>
  );
}

export default function ResultsSection({ result }: { result: ProcessResult }) {
  return (
    <section className="w-full bg-linear-to-b from-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pb-8 lg:pb-12">
        <StatsBar {...result} />
        <UserList users={result.notFollowingBack} />
      </div>
    </section>
  );
}
