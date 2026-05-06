import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "建築AI経営研究会 アップセル戦略ダッシュボード | LIFEFUND",
  description: "建築×AIのリーディングカンパニーへ — 商材ラインナップ・カスタマージャーニー・KPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex bg-slate-50">
        <Nav />
        <main className="flex-1 min-w-0 p-8 max-w-full overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
