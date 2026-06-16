import { FadeIn } from "@/components/Motion";
import { OperatingLoop } from "@/components/OperatingLoop";

const exploring = ["Claude Code", "Codex", "Gemini", "Agent", "MCP", "AI Video", "AI 3D"];
const rhythms = ["研究", "构建", "沉淀", "分享", "迭代"];

export function Hero() {
  return (
    <section id="hero" className="section-shell flex min-h-screen items-center pt-20">
      <div className="grid w-full gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <FadeIn>
          <div className="mb-10 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            <span>AI Research</span>
            <span>/</span>
            <span>Workflow</span>
            <span>/</span>
            <span>Content System</span>
          </div>
          <p className="section-kicker mb-5">研究日志</p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[1.12] text-balance sm:text-6xl lg:text-[5.25rem]">
            构建属于自己的 AI 操作系统
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-9 text-muted">
            持续研究 AI，构建真实可用的系统，把问题、实验、知识和内容沉淀成可复用的方法。
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {rhythms.map((item) => (
              <span key={item} className="border border-line px-3 py-1.5 text-sm text-muted">
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <OperatingLoop />
          <div className="mt-6 border-t border-line pt-5">
            <p className="section-kicker mb-4">当前关注</p>
            <div className="flex flex-wrap gap-2">
              {exploring.map((item) => (
                <span key={item} className="muted-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
