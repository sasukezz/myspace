type QuestionGlyphProps = {
  index: number;
};

export function QuestionGlyph({ index }: QuestionGlyphProps) {
  const label = String(index + 1).padStart(2, "0");

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 hidden h-24 w-32 text-line sm:block" aria-hidden="true">
      <svg viewBox="0 0 160 112" fill="none" className="h-full w-full">
        <path d="M18 86C42 52 56 64 78 36C100 8 118 24 142 10" stroke="currentColor" strokeWidth="1" />
        <path d="M24 78H72M72 78V48M72 48H120M120 48V22" stroke="currentColor" strokeWidth="1" />
        <circle cx="24" cy="78" r="5" fill="#f7f6f2" stroke="currentColor" />
        <circle cx="72" cy="48" r="5" fill="#f7f6f2" stroke="currentColor" />
        <circle cx="120" cy="22" r="5" fill="#f7f6f2" stroke="currentColor" />
        <text x="18" y="24" fill="currentColor" fontSize="18" fontFamily="Arial, sans-serif">
          {label}
        </text>
      </svg>
    </div>
  );
}
