import { FadeIn } from "@/components/Motion";

const statements = [
  {
    secondary: "模型",
    primary: "工作流",
    sentence: "不是模型，而是工作流",
    note: "模型会变得越来越强，也越来越相似。真正决定结果的，是人如何组织任务、上下文和反馈。"
  },
  {
    secondary: "提示词",
    primary: "知识沉淀",
    sentence: "不是提示词，而是知识沉淀",
    note: "一次性的 prompt 会消失，可复用的知识结构会留下，并在下一个项目里继续生长。"
  },
  {
    secondary: "写代码",
    primary: "思考问题",
    sentence: "不是写代码，而是思考问题",
    note: "代码只是验证想法的方式之一。更重要的是提出问题、拆解问题，并持续复盘。"
  }
];

export function Manifesto() {
  return (
    <section id="manifesto" className="section-band py-24 sm:py-32">
      <div className="section-shell">
        <FadeIn>
        <div>
          <p className="section-kicker mb-10">理念</p>
          <div className="grid gap-0 border-t border-line">
            {statements.map((statement, index) => (
              <article
                key={statement.primary}
                className="border-b border-line py-8 sm:py-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
                  <span className="text-sm text-muted">0{index + 1}</span>
                  <h3 className="text-3xl font-medium leading-[1.22] text-muted sm:text-4xl">
                    不是{statement.secondary}，而是
                    <strong className="font-semibold text-ink">{statement.primary}</strong>
                  </h3>
                </div>
                <p className="mt-5 max-w-4xl text-base leading-8 text-muted sm:text-lg">{statement.note}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-lg leading-9 text-muted">
            我希望持续研究 AI 如何改变学习、创作、产品开发和知识管理，并把这些研究沉淀成可以复用的方法论。
          </p>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
