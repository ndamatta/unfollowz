"use client";
import { useState } from "react";
import { IGUser, ProcessResult } from "@/src/lib/processFiles";
import { useTranslations } from "next-intl";

function StatsBar({ followingCount, followersCount, notFollowingBack }: ProcessResult) {
  const t = useTranslations("home.results");

  return (
    <div className="grid grid-cols-3 gap-5 sm:gap-6 mb-8">
      <div className="flex flex-col items-center bg-zinc-800 rounded-2xl px-2 py-2 shadow-sm">
        <span className="text-2xl md:text-3xl font-bold text-rose-200">
          {followersCount}
        </span>
        <span className="text-xs sm:text-sm text-slate-200 mt-1">
          {t("followers")}
        </span>
      </div>

      <div className="flex flex-col items-center bg-zinc-800 rounded-2xl px-10 py-2 shadow-2xl">
        <span className="text-xl sm:text-3xl md:text-4xl font-bold text-rose-500">
          {notFollowingBack.length}
        </span>
        <span className="text-xs sm:text-sm text-slate-200 mt-1">
          {t("notFollowingBack")}
        </span>
      </div>

      <div className="flex flex-col items-center bg-zinc-800 rounded-2xl px-2 py-2 shadow-sm">
        <span className="text-2xl md:text-3xl font-bold text-rose-200">
          {followingCount}
        </span>
        <span className="text-xs sm:text-sm text-slate-200 mt-1">
          {t("following")}
        </span>
      </div>
    </div>
  );
}

function UserList({ users }: { users: IGUser[] }) {
  const t = useTranslations("home.results");
  const tActions = useTranslations("common.actions");
  const tStates = useTranslations("common.states");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15;

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedUsers = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="mx-auto max-w-2xl">
      <input
        type="text"
        aria-label={t("searchPlaceholder")}
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full mb-4 px-4 py-2 rounded-xl bg-zinc-800 border border-slate-600 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-rose-400 transition-colors duration-200"
      />

      <div className="overflow-hidden rounded-xl border border-dashed border-slate-600 min-h-[585px]">
        <table className="w-full text-sm text-left">
          <caption className="sr-only">{t("tableTitle")}</caption>
          <thead className="bg-zinc-800 text-slate-100 text-xs uppercase">
            <tr>
              <th colSpan={2} className="px-4 py-2 text-center">
                {t("tableTitle")}
                <span className="font-sketch text-rose-400 text-sm">z</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700">
            {paginatedUsers.map((u) => (
              <tr key={u.username} className="hover:bg-zinc-300 transition">
                <td className="px-4 py-2 text-zinc-900">{u.username}</td>
                <td className="px-4 py-2 text-right">
                  <a
                    href={u.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-400 hover:text-rose-300 transition-colors duration-200"
                  >
                    {tActions("seeProfile")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-sm text-slate-500 text-center py-6">
            {tStates("noResults")}
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-zinc-800 border border-slate-600 disabled:opacity-50"
          >
            {tActions("previous")}
          </button>

          <span>{currentPage} / {totalPages}</span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-zinc-800 border border-slate-600 disabled:opacity-50"
          >
            {tActions("next")}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ResultsSection({ result }: { result: ProcessResult }) {
  const t = useTranslations("home.results");

  const hasNoUnfollowers = result.notFollowingBack.length === 0;

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pb-8 lg:pb-12">
        <StatsBar {...result} />

        {hasNoUnfollowers ? (
          <div className="mx-auto max-w-2xl text-center bg-zinc-800 rounded-xl py-2">
            <p className="text-lg sm:text-xl font-semibold text-green-400">
              {t("noUnfollowers")}
            </p>
          </div>
        ) : (
          <UserList users={result.notFollowingBack} />
        )}
      </div>
    </section>
  );
}