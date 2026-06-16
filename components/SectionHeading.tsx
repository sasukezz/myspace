type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 grid gap-5 border-t border-line pt-6 md:grid-cols-[0.72fr_1.6fr]">
      <p className="section-kicker">{eyebrow}</p>
      <div>
        <h2 className="max-w-3xl text-3xl font-medium leading-[1.18] text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
