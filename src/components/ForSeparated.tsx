import { For, Show, type JSX } from "solid-js";

export const ForSeparated = <T,>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => JSX.Element;
  separator: JSX.Element;
}) => (
  <For each={props.each} fallback={props.fallback}>
    {(item, index) => (
      <>
        <Show when={index()}>{props.separator}</Show>
        {props.children(item, index)}
      </>
    )}
  </For>
);
