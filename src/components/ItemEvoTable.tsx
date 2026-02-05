import { For } from "solid-js";
import type { Item } from "../types/ItemSchema";
import { ItemIcon } from "./ItemIcon";
import type { Evolution } from "../types/EvolutionInfo";
import { Map2 } from "../util/Data";

export type ItemEvoTableProps = {
  items: Item[];
  evolutions: Evolution[];
};
export const ItemEvoTable = ({ items, evolutions }: ItemEvoTableProps) => {
  const double = evolutions
    .filter(({ items }) => items.length == 2)
    .reduce(
      (map, { items: [first, second], result: result }) =>
        map.set(first, second, result),
      new Map2<Item, Item, Item>(),
    );
  const reversed = [...items].reverse();
  return (
    <table class="item-evo-table">
      <tbody>
        <tr>
          <th></th>
          <For each={items.slice(0, -1)}>
            {(item) => (
              <th>
                <div class="item-icon-cell">
                  <ItemIcon item={item} />
                </div>
              </th>
            )}
          </For>
        </tr>
        <For each={reversed.slice(0, -1)}>
          {(row, i) => (
            <tr>
              <th>
                <div class="item-icon-cell">
                  <ItemIcon item={row} />
                </div>
              </th>
              <For each={items.slice(0, items.length - i() - 1)}>
                {(column) => (
                  <td>
                    <div class="item-icon-cell">
                      <ItemIcon
                        item={
                          double.get(row, column) ?? double.get(column, row)
                        }
                      />
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
