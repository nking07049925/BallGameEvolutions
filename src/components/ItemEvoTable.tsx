import { For } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import { Map2 } from "../util/Data";
import type { Item } from "../data/Items";
import type { Evolution } from "../data/Evolutions";

export type ItemEvoTableProps = {
  items: Item[];
  evolutions: Evolution[];
};
export const ItemEvoTable = ({ items, evolutions }: ItemEvoTableProps) => {
  const double = evolutions
    .filter(({ items }) => items.length == 2)
    .reduce(
      (map, { items: [first, second], result: result }) =>
        map.set(first, second, result) && map.set(second, first, result),
      new Map2<Item, Item, Item>(),
    );

  const filtered = items.filter((item) => double.has(item));

  return (
    <table class="item-evo-table">
      <tbody>
        <tr>
          <th></th>
          <For each={filtered}>
            {(item) => (
              <th>
                <div class="item-icon-cell">
                  <ItemIcon item={item} />
                </div>
              </th>
            )}
          </For>
        </tr>
        <For each={filtered}>
          {(row) => (
            <tr>
              <th>
                <div class="item-icon-cell">
                  <ItemIcon item={row} />
                </div>
              </th>
              <For each={filtered}>
                {(column) => (
                  <td>
                    <div class="item-icon-cell">
                      <ItemIcon item={double.get(row, column)} />
                    </div>
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
