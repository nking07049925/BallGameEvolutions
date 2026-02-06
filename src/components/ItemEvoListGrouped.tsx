import { For, Show } from "solid-js";
import type { Evolution } from "../data/Evolutions";
import type { Item } from "../data/Items";
import { ItemEvoList } from "./ItemEvoList";
import { ArrayDict } from "../util/Data";
import { ItemIcon } from "./ItemIcon";

export type ItemEvoListGroupedProps = {
  items: Item[];
  evolutions: Evolution[];
};
export const ItemEvoListGrouped = ({
  evolutions,
  items,
}: ItemEvoListGroupedProps) => {
  const evolvesInto = new ArrayDict<Item, Evolution>();
  evolutions.forEach((evo) =>
    evo.items.forEach((item) => evolvesInto.add(item, evo)),
  );
  const evolvesFrom = new ArrayDict<Item, Evolution>();
  evolutions.forEach((evo) => evolvesFrom.add(evo.result, evo));
  const filtered = items.filter(
    (item) => evolvesFrom.has(item) || evolvesInto.has(item),
  );

  return (
    <div class="item-evo-grouped" style="columns: 4">
      <For each={filtered}>
        {(item) => (
          <div style="display: inline-flex; flex-direction: column; padding: 8px; width: 100%">
            <h3 style="display: flex; align-items: center; gap: 8px">
              <ItemIcon item={item} size={30} /> {item.name}
            </h3>
            <div class="item-evo-group">
              <Show when={evolvesFrom.has(item)}>
                <h4>Evolves from</h4>
                <ItemEvoList evolutions={evolvesFrom.get(item)!} />
              </Show>
              <Show when={evolvesInto.has(item)}>
                <h4>Evolves into</h4>
                <ItemEvoList evolutions={evolvesInto.get(item)!} />
              </Show>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
