import type { Item } from "../data/Items";
import { ItemCard } from "./ItemCard";

export type ItemEvoListGroupedProps = {
  items: Item[];
};
export const ItemEvoListGrouped = ({ items }: ItemEvoListGroupedProps) => {
  const filtered = items.filter(
    (item) => item.evolvesFrom.length || item.synergizesWith.length,
  );

  return (
    <div class="item-evo-grouped">
      {filtered.map((item) => (
        <ItemCard item={item} style="padding: 8px" />
      ))}
    </div>
  );
};
