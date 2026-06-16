import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/Motion";
import type { ContactItem } from "@/lib/types";

type ContactProps = {
  items: ContactItem[];
};

export function Contact({ items }: ContactProps) {
  return (
    <footer id="contact" className="section-shell py-24 sm:py-32">
      <FadeIn>
        <div className="border-t border-line pt-12 text-center">
          <p className="section-kicker mb-7">联系</p>
          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-[1.25] text-balance sm:text-4xl">
            也关注 AI？
            <br />
            一起构建点什么。
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink"
              >
                {item.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
