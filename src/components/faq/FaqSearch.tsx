"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { FaqItemData } from "@/lib/faq";

export function FaqSearch({ items }: { items: FaqItemData[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
        )
      : items;

    const map = new Map<string, FaqItemData[]>();
    for (const item of filtered) {
      map.set(item.category, [...(map.get(item.category) ?? []), item]);
    }
    return Array.from(map.entries());
  }, [items, query]);

  return (
    <div>
      <div className="relative mx-auto mb-10 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une question…"
          aria-label="Rechercher dans la FAQ"
          className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {categories.length === 0 && (
        <p className="text-center text-neutral-500">Aucune question ne correspond à votre recherche.</p>
      )}

      <div className="space-y-10">
        {categories.map(([category, categoryItems]) => (
          <div key={category}>
            <h2 className="mb-4 text-xl">{category}</h2>
            <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
              {categoryItems.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-medium text-neutral-900">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && <p className="px-5 pb-4 text-sm text-neutral-600">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
