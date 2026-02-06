import { type JSX } from "solid-js";
import type { Item } from "../data/Items";

const itemToStyle = (
  item: Item | undefined,
  size: number,
): JSX.CSSProperties => {
  if (!item || !("spriteImage" in item)) return {};
  const {
    spriteImageUrl,
    spriteImage: { width, height },
    spriteRegion: { x, y, w, h },
  } = item;

  const maxSize = Math.max(w, h) - 1;

  const widthScale = size / maxSize;
  const heightScale = size / maxSize;

  const xScale = (width * widthScale) / size;
  const yScale = (height * heightScale) / size;

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
export const ItemIcon = ({ item, size }: ItemIconProps) => {
  size ??= 32;

  return (
    <div
      class="item-icon"
      title={item?.name ?? "Missing item"}
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
        "min-width": `${size}px`,
        "min-height": `${size}px`,
        ...itemToStyle(item, size),
      }}
    />
  );
};
