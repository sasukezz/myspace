const nodes = ["问题", "实验", "系统", "内容", "复盘"];

export function OperatingLoop() {
  return (
    <div className="border-y border-line/80 py-8" aria-hidden="true">
      <svg viewBox="0 0 560 220" fill="none" className="h-auto w-full text-ink">
        <path d="M74 94H454" stroke="#dedbd2" strokeWidth="1.5" />
        <path d="M454 94C508 94 508 172 454 172H126C72 172 72 94 126 94" stroke="#dedbd2" strokeWidth="1.5" />
        <path d="M438 83L454 94L438 105" stroke="#8a5a44" strokeWidth="1.5" />
        <path d="M142 183L126 172L142 161" stroke="#8a5a44" strokeWidth="1.5" />
        {nodes.map((node, index) => {
          const x = 76 + index * 102;
          const y = index < 4 ? 94 : 172;
          return (
            <g key={node}>
              <circle cx={x} cy={y} r="30" fill="#f7f6f2" stroke="#dedbd2" />
              <text
                x={x}
                y={y - 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="15"
                fontWeight="600"
                fill="#151515"
                fontFamily="Arial, sans-serif"
              >
                {node}
              </text>
              <text
                x={x}
                y={y + 17}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="#8a5a44"
                fontFamily="Arial, sans-serif"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
