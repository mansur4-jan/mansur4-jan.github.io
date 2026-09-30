import type { ReactNode } from "react";

/** Desktop keeps the text in place; mobile exposes it through native disclosure. */
export function MobileDisclosure({ children }: { children: ReactNode }) {
  return <><div className="desktop-explanation">{children}</div><details className="mobile-explanation"><summary><span className="explanation-closed">Подробнее</span><span className="explanation-open">Свернуть</span><span aria-hidden="true">＋</span></summary>{children}</details></>;
}
