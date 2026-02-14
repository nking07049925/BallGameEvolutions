import { Link } from "wouter-preact";
import type { Item } from "../data/Items";
import type { CSSProperties } from "preact";
import { Popover } from "./Popover";
import { ItemCard } from "./ItemCard";

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

  const xOffset = (w - maxSize) / 2;
  const yOffset = (h - maxSize) / 2 - h;

  const normalizedX = (x + xOffset) * widthScale;
  const normalizedY = (height - y + yOffset) * heightScale;

  const round = (unit: string) => (num: number) => num.toFixed(2) + unit;
  const bgPos = [-normalizedX, -normalizedY].map(round("px")).join(" ");
  const bgSize = [xScale * 100, yScale * 100].map(round("%")).join(" ");

  return {
    backgroundImage: `url("${spriteImageUrl}")`,
    backgroundPosition: bgPos,
    backgroundSize: bgSize,
    imageRendering: "pixelated",
  };
};

export type ItemIconProps = {
  item?: Item;
  size?: number;
  showPopover?: boolean;
};
export const ItemIcon = ({ item, size, showPopover }: ItemIconProps) => {
  size ??= 32;

  const icon = (
    <Link
      href={`/items/${item?.id ?? "Invalid item"}`}
      class="item-icon"
      title={!showPopover ? (item?.name ?? "Missing item") : undefined}
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

  if (!showPopover || !item) return icon;

  return (
    <Popover
      content={<ItemCard item={item} style="width: 300px" />}
      triggerStyle="line-height: 0"
    >
      {icon}
    </Popover>
  );
};
