"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | undefined;
function probe(): boolean {
  if (cached !== undefined) return cached;
  try {
    const c = document.createElement("canvas");
    cached = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}
const noop = () => () => {};
/** true when the browser can create a WebGL context (false on the server, so SSR renders the fallback). */
export const useWebGL = () => useSyncExternalStore(noop, probe, () => false);
