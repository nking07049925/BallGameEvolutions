import { For } from "solid-js";
import type { Item, Evolution } from "../data/Items";
import { ItemCard } from "./ItemCard";

export type ItemEvoListGroupedProps = {
  items: Item[];
  evolutions: Evolution[];
};
export const ItemEvoListGrouped = (props: ItemEvoListGroupedProps) => {
  const filtered = props.items.filter(
    (item) => item.evolvesFrom.length || item.evolvesInto.length,
  );

  return (
    <div class="item-evo-grouped">
      <For each={filtered}>{(item) => <ItemCard item={item} />}</For>
    </div>
  );
};
