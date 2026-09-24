import type { MetadataRoute } from "next";
import { getPaths } from "@/components/SitePage";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getPaths().map((path) => ({ url: "https://school-bratsk.ru" + path }));
}
