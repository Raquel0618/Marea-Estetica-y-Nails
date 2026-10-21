import type { MouseEvent } from "react";

/**
 * Open WhatsApp / Instagram / Maps outside of any embedding frame.
 * Those sites refuse to load inside an iframe ("la página está bloqueada"),
 * so we always try a new tab first and fall back to the top-level window.
 */
export function openExternal(url: string): void {
  if (typeof window === "undefined") return;
  const win = window.open(url, "_blank");
  if (win) {
    try {
      win.opener = null;
    } catch {
      /* ignore */
    }
    return;
  }
  try {
    if (window.top && window.top !== window) {
      window.top.location.href = url;
      return;
    }
  } catch {
    /* cross-origin top: fall through */
  }
  window.location.href = url;
}

/** onClick handler for <a href target="_blank"> external links. */
export function handleExternalClick(e: MouseEvent<HTMLAnchorElement>): void {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  openExternal(e.currentTarget.href);
}
