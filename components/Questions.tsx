"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/Motion";
import { QuestionGlyph } from "@/components/QuestionGlyph";
import { SectionHeading } from "@/components/SectionHeading";
import type { Question } from "@/lib/types";

type QuestionsProps = {
  questions: Question[];
};

export function Questions({ questions }: QuestionsProps) {
  const [openId, setOpenId] = useState(questions[0]?.id ?? "");
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const manualUntilRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < manualUntilRef.current) {
          return;
        }

        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = activeEntry?.target.getAttribute("data-question-id");
        if (id) {
          setOpenId(id);
        }
      },
      {
        rootMargin: "-28% 0px -45% 0px",
        threshold: [0.35, 0.55, 0.75]
      }
    );

    questions.forEach((question) => {
      const node = itemRefs.current[question.id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [questions]);

  return (
    <section id="questions" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="问题"
        title="我更关注问题，而不是工具。"
        description="这些问题不是技能列表，而是长期维护的研究入口。每一个问题都会通过实验、笔记和系统建设持续更新。"
      />
      <div className="grid gap-3">
        {questions.map((question, index) => {
          const open = openId === question.id;
          return (
            <FadeIn key={question.id} delay={index * 0.04}>
              <article
                ref={(node) => {
                  itemRefs.current[question.id] = node;
                }}
                data-question-id={question.id}
                className={`relative overflow-hidden border p-5 transition-colors sm:p-7 ${
                  open ? "border-ink/35 bg-[#fbfaf7]" : "border-line bg-paper hover:border-ink/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    manualUntilRef.current = Date.now() + 4000;
                    setOpenId(open ? "" : question.id);
                  }}
                  className="flex w-full items-start justify-between gap-5 text-left"
                  aria-expanded={open}
                >
                  <span>
                    <span className="section-kicker block">长期问题 {String(index + 1).padStart(2, "0")}</span>
                    <span className="mt-3 block max-w-4xl text-2xl font-medium leading-[1.28] text-balance sm:text-3xl">
                      {question.title}
                    </span>
                  </span>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-muted transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {!open ? (
                  <>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{question.status}</p>
                    <div className="mt-5 flex flex-wrap gap-2 pr-24">
                      {question.experiments.slice(0, 3).map((item) => (
                        <span key={item} className="muted-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                    <QuestionGlyph index={index} />
                  </>
                ) : null}
                {open ? (
                  <div className="mt-7 grid gap-6 border-t border-line pt-6 text-sm leading-7 text-muted md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <p className="mb-1 font-medium text-ink">为什么研究</p>
                      <p>{question.why}</p>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-ink">目前状态</p>
                      <p>{question.status}</p>
                    </div>
                    <div>
                      <p className="mb-2 font-medium text-ink">相关实验</p>
                      <div className="flex flex-wrap gap-2">
                        {question.experiments.map((item) => (
                          <span key={item} className="muted-tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    {question.articles.length > 0 ? (
                      <div>
                        <p className="mb-2 font-medium text-ink">相关文章</p>
                        <div className="space-y-2">
                          {question.articles.map((article) => (
                            <a
                              key={article.href}
                              href={article.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-ink underline decoration-line underline-offset-4"
                            >
                              {article.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
