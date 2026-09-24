import Image from "next/image";
import platforms from "@/content/school-platforms.json";

export function SchoolPlatforms({ footer = false }: { footer?: boolean }) {
  return <div className={`school-platforms${footer ? " school-platforms-footer" : ""}`}>
    <p>{footer ? "Мы на других площадках" : "Отзывы на площадках"}</p>
    <nav aria-label={footer ? "Школа на внешних площадках" : "Отзывы на внешних площадках"}>
      {platforms.map(platform => <a key={platform.name} href={platform.href} target="_blank" rel="noopener noreferrer" aria-label={`${platform.name} — откроется в новой вкладке`}>{platform.icon && <Image src={platform.icon} alt="" width={20} height={20} />}{platform.name}<span aria-hidden="true">↗</span></a>)}
    </nav>
  </div>;
}
