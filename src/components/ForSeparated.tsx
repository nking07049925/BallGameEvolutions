import { For, Show, type JSX } from "solid-js";

export const ForSeparated = <T, U extends JSX.Element>(props: {
  each: readonly T[];
  fallback?: JSX.Element;
  children: (item: T, index: () => number) => U;
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
