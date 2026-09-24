import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SitePage, getPage, getPaths } from "@/components/SitePage";

export function generateStaticParams() {
  return getPaths().filter((path) => path !== "/").map((path) => ({ slug: path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = "/" + slug.join("/") + "/";
  const page = getPage(path);
  return { title: page ? page.title + " — ИНТЕЛЛЕКТ" : "Страница не найдена — ИНТЕЛЛЕКТ" };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = "/" + slug.join("/") + "/";
  if (!getPage(path)) notFound();
  return <SitePage path={path} />;
}
