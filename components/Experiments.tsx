import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Experiment } from "@/lib/types";

type ExperimentsProps = {
  experiments: Experiment[];
};

export function Experiments({ experiments }: ExperimentsProps) {
  return (
    <section id="experiments" className="section-band py-24 sm:py-32">
      <div className="section-shell">
      <SectionHeading
        eyebrow="实验"
        title="每一个项目都是一次实验，而不是一次作品展示。"
        description="统一使用研究问题、假设、实验、发现和下一步记录，避免把研究变成项目陈列。"
      />
      <div className="space-y-8">
        {experiments.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.05}>
            <article className="grid overflow-hidden border border-line bg-paper md:grid-cols-[0.86fr_1.14fr]">
              <div className="relative aspect-[16/10] border-b border-line bg-[#f7f6f2] p-4 md:aspect-auto md:min-h-[390px] md:border-b-0 md:border-r">
                <Image
                  src={item.image}
                  alt={`${item.name} 截图`}
                  fill
                  sizes="(min-width: 1024px) 36vw, (min-width: 768px) 42vw, 100vw"
                  quality={72}
                  priority={index === 0}
                  className="object-contain p-4"
                />
              </div>
              <div className="p-5 sm:p-8 lg:p-10">
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="section-kicker">
                      实验 {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-3xl font-medium leading-tight">{item.name}</h3>
                  </div>
                  {item.link ? (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      {item.link.label}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <div className="grid gap-x-8 gap-y-6 text-sm leading-7 text-muted sm:grid-cols-2">
                  <Block label="研究问题" value={item.question} />
                  <Block label="假设" value={item.hypothesis} />
                  <Block label="实验" value={item.experiment} />
                  <div>
                    <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-ink">发现</p>
                    <ul className="space-y-2">
                      {item.finding.map((finding) => (
                        <li key={finding}>{finding}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-2">
                    <Block label="下一步" value={item.next} />
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
      </div>
    </section>
  );
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-ink">{label}</p>
      <p>{value}</p>
    </div>
  );
}
