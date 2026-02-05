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

  return {
    "background-image": `url("${spriteImageUrl}")`,
    "background-position": `${-(x / w) * size}px ${-(y / h) * size}px`,
    "background-size": `${(width / w) * 100}% ${(height / h) * 100}%`,
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
