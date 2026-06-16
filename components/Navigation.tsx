"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["首页", "hero"],
  ["理念", "manifesto"],
  ["问题", "questions"],
  ["实验", "experiments"],
  ["系统", "systems"],
  ["笔记", "notes"],
  ["联系", "contact"]
];

export function Navigation() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    navItems.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-line/70 bg-paper/92 backdrop-blur">
      <nav className="section-shell flex h-14 items-center justify-between gap-6">
        <a href="#hero" className="shrink-0 text-sm font-semibold tracking-tight">
          AI 研究系统
        </a>
        <div className="hidden items-center gap-1 overflow-x-auto md:flex">
          {navItems.slice(1).map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-md px-3 py-2 text-xs transition-colors ${
                active === id ? "bg-ink text-paper" : "text-muted hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
