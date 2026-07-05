"use client";

export function isPageReload() {
  const nav = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function clearUrlHash() {
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}

/** Smooth-scroll to an on-page anchor without leaving a hash in the URL. */
export function scrollToAnchor(href: string) {
  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  if (!id || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    clearUrlHash();
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  clearUrlHash();
}

/** Keep reloads at the top; strip stale #hash fragments left by nav clicks. */
export function runScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (isPageReload()) {
    clearUrlHash();
    scrollToTop();
    return;
  }

  if (!window.location.hash) {
    scrollToTop();
  }
}
