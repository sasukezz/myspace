import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-research-os.local";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI 研究系统",
    template: "%s | AI 研究系统"
  },
  description: "一个持续提出问题、验证问题、沉淀方法论，并公开分享 AI 研究过程的网站。",
  openGraph: {
    title: "AI 研究系统",
    description: "研究 AI，构建系统，分享知识，持续迭代。",
    url: siteUrl,
    siteName: "AI 研究系统",
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 研究系统",
    description: "研究 AI，构建系统，分享知识，持续迭代。"
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
