/* @refresh reload */
import { hydrate, prerender as ssr } from "preact-iso";
import "./index.css";
import { App } from "./App.tsx";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = document.getElementById("root")!;
  hydrate(<App />, root);
}

export async function prerender() {
  return await ssr(<App />);
}
