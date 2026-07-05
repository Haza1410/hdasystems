"use client";

import { useEffect, useLayoutEffect } from "react";
import { isPageReload, runScrollRestoration, scrollToTop } from "@/lib/scroll";

const SCENE_READY_EVENT = "hda:scene-ready";

export default function ScrollRestoration() {
  // Run before first paint so reload doesn't flash the old scroll position.
  useLayoutEffect(() => {
    runScrollRestoration();
  }, []);

  useEffect(() => {
    // The preloader unlocks overflow after the 3D scene loads — re-assert top
    // so the browser can't restore an old scroll position underneath it.
    const onSceneReady = () => {
      if (isPageReload() || !window.location.hash) {
        scrollToTop();
      }
    };

    window.addEventListener(SCENE_READY_EVENT, onSceneReady);
    return () => window.removeEventListener(SCENE_READY_EVENT, onSceneReady);
  }, []);

  return null;
}
