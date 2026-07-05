const SETTLE_MS = 150;
const POLL_MS = 250;

function trackElement(
  el: HTMLImageElement | HTMLIFrameElement,
  pending: Map<EventTarget, () => void>,
  onEmpty: () => void
) {
  if (pending.has(el)) return;

  if (el instanceof HTMLImageElement) {
    if (el.complete) return;
  } else {
    try {
      if (el.contentDocument?.readyState === "complete") return;
    } catch {
      // Cross-origin iframe — wait for load event.
    }
  }

  const untrack = () => {
    pending.delete(el);
    if (pending.size === 0) onEmpty();
  };
  pending.set(el, untrack);
  el.addEventListener("load", untrack, { once: true });
  el.addEventListener("error", untrack, { once: true });
}

/** Wait until images and iframes in the tree have loaded (or timed out). */
export function waitForMedia(
  root: ParentNode,
  timeoutMs = 15000
): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const pending = new Map<EventTarget, () => void>();

    const finish = () => {
      if (done) return;
      done = true;
      observer.disconnect();
      clearTimeout(hardTimeout);
      clearInterval(poll);
      resolve();
    };

    const scan = () => {
      root.querySelectorAll("img, iframe").forEach((node) => {
        trackElement(node as HTMLImageElement | HTMLIFrameElement, pending, finish);
      });
      if (pending.size === 0) finish();
    };

    const observer = new MutationObserver(scan);
    observer.observe(root, { childList: true, subtree: true });

    const hardTimeout = setTimeout(finish, timeoutMs);
    const poll = setInterval(scan, POLL_MS);

    // Let hydration mount lazy iframes before the first scan.
    setTimeout(scan, SETTLE_MS);
  });
}
