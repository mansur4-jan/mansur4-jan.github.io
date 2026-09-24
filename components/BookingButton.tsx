"use client";

import type { ReactNode } from "react";

export function BookingButton({ children, className }: { children: ReactNode; className?: string }) {
  return <button type="button" className={className} aria-haspopup="dialog" aria-controls="site-menu" onClick={(event) => {
    window.dispatchEvent(new CustomEvent("school:booking", { detail: event.currentTarget }));
  }}>{children}</button>;
}
