import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { ExperienceItem } from "@/lib/types";

type ExperienceProps = {
  items: ExperienceItem[];
};

export function Experience({ items }: ExperienceProps) {
  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <SectionHeading eyebrow="经历" title="能力背景" />
      <div className="space-y-3">
        {items.map((item, index) => (
          <FadeIn key={item.company} delay={index * 0.05}>
            <article className="grid gap-4 border-t border-line py-6 md:grid-cols-[0.4fr_1fr_0.9fr] md:items-start">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xl font-medium transition-colors hover:text-accent"
              >
                {item.company}
                <ExternalLink className="h-4 w-4 text-muted" aria-hidden="true" />
              </a>
              <p className="font-medium leading-7">{item.focus}</p>
              <p className="text-sm leading-7 text-muted">{item.description}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
