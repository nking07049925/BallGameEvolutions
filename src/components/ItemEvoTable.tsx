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
      (map, { items: [first, second], result }) =>
        map.set(first, second, result).set(second, first, result),
      new Map2<Item, Item, Item>(),
    );

  const filtered = items.filter((item) => double.has(item));

  return (
    <table class="item-evo-table">
      <tbody>
        <tr style="position: sticky; top: 0; z-index: 1">
          <th style="z-index: 2; position: sticky; top: 0; left: 0"></th>
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
              <th style="position: sticky; left: 0">
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
