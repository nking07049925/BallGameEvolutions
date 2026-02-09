import { Link } from "wouter-preact";
import type { Item } from "../data/Items";
import type { CSSProperties } from "preact";

const itemToStyle = (item: Item | undefined, size: number): CSSProperties => {
  if (!item) return {};
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
    backgroundImage: `url("${spriteImageUrl}")`,
    backgroundPosition: `${-normalizedX}px ${-normalizedY}px`,
    backgroundSize: `${xScale * 100}% ${yScale * 100}%`,
    imageRendering: "pixelated",
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
    <Link
      href={`/items/${item?.id ?? "Invalid item"}`}
      class="item-icon"
      title={item?.name ?? "Missing item"}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        ...itemToStyle(item, size),
      }}
    />
  );
};
