import { mergeProps, type JSX } from "solid-js";
import type { Item } from "../data/Items";
import { A } from "@solidjs/router";

type StyleProps = { size: number; item?: Item };

const itemToStyle = (props: StyleProps): JSX.CSSProperties => {
  if (!props.item) return {};
  const {
    spriteImageUrl,
    spriteImage: { width, height },
    spriteRegion: { x, y, w, h },
  } = props.item;

  const maxSize = Math.max(w, h) - 1;

  const widthScale = props.size / maxSize;
  const heightScale = props.size / maxSize;

  const xScale = (width * widthScale) / props.size;
  const yScale = (height * heightScale) / props.size;

  const xOffset = (w - maxSize + 1) / 2;
  const yOffset = (h - maxSize) / 2 - h;

  const normalizedX = (x + xOffset) * widthScale;
  const normalizedY = (height - y + yOffset) * heightScale;

  return {
    "background-image": `url("${spriteImageUrl}")`,
    "background-position": `${-normalizedX}px ${-normalizedY}px`,
    "background-size": `${xScale * 100}% ${yScale * 100}%`,
    "image-rendering": "pixelated",
  };
};

export type ItemIconProps = {
  item?: Item;
  size?: number;
  showTooltip?: boolean;
};
export const ItemIcon = (props: ItemIconProps) => {
  const merged = mergeProps({ size: 32 }, props);

  return (
    <A
      href={`/items/${props.item?.id ?? "Invalid item"}`}
      class="item-icon"
      title={props.item?.name ?? "Missing item"}
      noScroll
      style={{
        display: "inline-block",
        width: `${merged.size}px`,
        height: `${merged.size}px`,
        "min-width": `${merged.size}px`,
        "min-height": `${merged.size}px`,
        ...itemToStyle(merged),
      }}
    />
  );
};
