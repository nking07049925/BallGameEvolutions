import { type JSX } from "solid-js";
import type { Item } from "../types/ItemSchema";

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

  const widthScale = size / w;
  const heightScale = size / h;

  const xScale = width / w;
  const yScale = height / h;

  const normalizedX = x * widthScale;
  const normalizedY = (height - y - h) * heightScale;

  if (item.id == "baby rattle")
    console.log("baby rattle", { normalizedX, normalizedY });

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
  size ??= 50;

  return (
    <div
      class="item-icon"
      title={item?.name ?? "Missing item"}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...itemToStyle(item, size),
      }}
    />
  );
};
