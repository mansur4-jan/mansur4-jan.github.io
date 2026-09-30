"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  className: string;
};

/** Decorative loops only download and play while their card is visible. */
export function VisibleAnimation({ src, poster, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    let disposed = false;

    const sync = () => {
      const allowed = visible && !document.hidden && !reducedMotion.matches && !connection?.saveData;
      video.dataset.active = String(allowed);
      video.dataset.playback = !visible ? "offscreen" : document.hidden ? "hidden" : reducedMotion.matches || connection?.saveData ? "still" : "starting";
      if (!allowed) {
        video.pause();
        return;
      }
      if (video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
      video.muted = true;
      void video.play().then(() => {
        if (disposed || !visible || document.hidden || reducedMotion.matches) video.pause();
        else video.dataset.playback = "playing";
      }).catch((error: unknown) => {
        // Keep the poster/last frame when the browser disallows autoplay.
        video.dataset.active = "false";
        video.dataset.playback = error instanceof Error ? error.name : "blocked";
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.05;
      sync();
    }, { threshold: [0, 0.05] });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
      video.pause();
    };
  }, [src]);

  return <div className={className} aria-hidden="true">
    <video ref={ref} poster={poster} width={width} height={height} muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1} />
  </div>;
}
