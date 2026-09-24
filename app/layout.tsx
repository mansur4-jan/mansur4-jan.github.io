import type { Metadata } from "next";
import "./globals.css";
import "./home-design.css";

export const metadata: Metadata = {
  title: "ИНТЕЛЛЕКТ — школа развития в Братске",
  description: "Школа скорочтения и развития интеллекта в Братске. Программы, занятия, контакты.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
