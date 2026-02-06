import { For, Show } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import { Map2 } from "../util/Data";
import type { Item, Evolution } from "../data/Items";

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
        <tr style="position: sticky; top: 2px; z-index: 1">
          <th style="z-index: 2; position: sticky; top: 2px; left: 2px"></th>
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
              <th style="position: sticky; left: 2px">
                <div class="item-icon-cell">
                  <ItemIcon item={row} />
                </div>
              </th>
              <For each={filtered}>
                {(column) => (
                  <td>
                    <Show when={double.has2(row, column)}>
                      <div class="item-icon-cell">
                        <ItemIcon item={double.get(row, column)} />
                      </div>
                    </Show>
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
