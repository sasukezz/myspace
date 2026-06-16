"use client";

import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { SystemNode } from "@/lib/types";

const pipeline = ["互联网", "研究", "知识沉淀", "工作流", "内容创作", "发布", "复盘"];

type SystemsProps = {
  systems: SystemNode[];
};

export function Systems({ systems }: SystemsProps) {
  const [openId, setOpenId] = useState(systems[0]?.id ?? "");

  return (
    <section id="systems" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="系统"
        title="我的目标不是积累项目，而是搭建每天使用的系统。"
        description="系统展示重点是管线、节点和复用方式。它们服务于研究、知识沉淀、工作流建设与内容输出。"
      />
      <FadeIn>
        <div className="mb-10 overflow-x-auto border-y border-line py-6">
          <div className="flex min-w-[760px] items-center justify-between gap-0">
            {pipeline.map((node, index) => (
              <div key={node} className="flex flex-1 items-center">
                <div className="flex w-full flex-col items-center gap-3 text-center">
                  <span className="h-2.5 w-2.5 rounded-full border border-accent bg-paper" />
                  <span className="text-sm font-medium">
                  {node}
                  </span>
                </div>
                {index < pipeline.length - 1 ? <span className="mx-2 h-px w-full bg-line" /> : null}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      <div className="grid gap-3 lg:grid-cols-5">
        {systems.map((system, index) => {
          const open = openId === system.id;
          return (
            <FadeIn key={system.id} delay={index * 0.04} className={open ? "lg:col-span-3" : "lg:col-span-1"}>
              <article className="h-full border border-line bg-paper transition-colors hover:border-ink/30">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? "" : system.id)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left"
                  aria-expanded={open}
                >
                  <span>
                    <span className="section-kicker">
                      {system.label}
                    </span>
                    <span className="mt-2 block text-xl font-medium">{system.name}</span>
                    {system.link ? (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                        {system.link.label}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </span>
                    ) : null}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {open ? (
                  <div className="border-t border-line p-5">
                    {system.image ? (
                      <div className="relative mb-5 aspect-[16/9] overflow-hidden border border-line bg-[#fbfaf7]">
                        <Image
                          src={system.image}
                          alt={`${system.name} 截图`}
                          fill
                          sizes="(min-width: 1024px) 54vw, 100vw"
                          className="object-contain p-3"
                        />
                      </div>
                    ) : null}
                    <p className="mb-4 text-sm leading-7 text-muted">{system.description}</p>
                    {system.link ? (
                      <a
                        href={system.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-4 inline-flex items-center gap-2 text-sm text-ink underline decoration-line underline-offset-4"
                      >
                        打开 {system.link.label}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    <ul className="space-y-2 text-sm leading-7 text-muted">
                      {system.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
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
