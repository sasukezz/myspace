import { FadeIn } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { LibraryItem } from "@/lib/types";

type LibraryProps = {
  items: LibraryItem[];
};

export function Library({ items }: LibraryProps) {
  return (
    <section id="library" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="资产"
        title="这里不是 Blog，而是可复用资产库。"
        description="提示词、工作流、模板、书签、代码、数据集都会作为长期资产持续增加。"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <FadeIn key={`${item.type}-${item.title}`} delay={index * 0.03}>
            <article className="editorial-card min-h-56 p-5 hover:border-ink/30 sm:p-6">
              <div className="mb-10 flex items-center justify-between gap-4">
                <span className="section-kicker text-accent">{item.type}</span>
                <span className="muted-tag">{item.status}</span>
              </div>
              <h3 className="text-xl font-medium leading-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
