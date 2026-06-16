"use client";

import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Note } from "@/lib/types";

type NotesProps = {
  notes: Note[];
};

export function Notes({ notes }: NotesProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("全部");

  const tags = useMemo(() => ["全部", ...Array.from(new Set(notes.flatMap((note) => note.tags)))], [notes]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesTag = tag === "全部" || note.tags.includes(tag);
      const matchesQuery =
        normalized.length === 0 ||
        `${note.title} ${note.source} ${note.tags.join(" ")}`.toLowerCase().includes(normalized);
      return matchesTag && matchesQuery;
    });
  }, [notes, query, tag]);

  return (
    <section id="notes" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="笔记"
        title="持续输出研究记录，而不是一次性文章。"
        description="研究笔记会成为网站持续更新的核心内容，支持按标签筛选和搜索。"
      />
      <FadeIn>
        <div className="mb-10 grid gap-5 border-y border-line py-5 md:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-wrap gap-2">
            {tags.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTag(item)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  tag === item ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 border-b border-line px-1 py-3">
            <Search className="h-4 w-4 text-muted" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索研究笔记"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
        </div>
      </FadeIn>
      <div className="border-l border-line">
        {filtered.map((note, index) => (
          <FadeIn key={note.id} delay={index * 0.04}>
            <article className="relative grid gap-4 border-b border-line py-7 pl-6 md:grid-cols-[0.28fr_1.45fr_0.45fr]">
              <span className="absolute -left-[5px] top-9 h-2.5 w-2.5 rounded-full border border-ink bg-paper" />
              <p className="section-kicker">{note.year}</p>
              <div>
                <a
                  href={note.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-2 text-xl font-medium leading-tight text-balance"
                >
                  {note.title}
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ink" />
                </a>
                <div className="mt-4 flex flex-wrap gap-2">
                  {note.tags.map((item) => (
                    <span key={item} className="muted-tag px-2.5 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted md:text-right">{note.source}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
