import { createMemo, For, Show } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import { Map2 } from "../util/Data";
import { type Item, evolutionsFromItem } from "../data/Items";

export type ItemEvoTableProps = {
  items: Item[];
};

export const ItemEvoTable = (props: ItemEvoTableProps) => {
  const filtered = createMemo(() => {
    const resultMap = props.items
      .flatMap(evolutionsFromItem)
      .filter(({ items }) => items.length == 2)
      .reduce(
        (map, { items: [first, second], result }) =>
          map.set(first, second, result).set(second, first, result),
        new Map2<Item, Item, Item>(),
      );

    const items = [...resultMap.keys()].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return { items, resultMap };
  });

  return (
    <table class="item-evo-table">
      <tbody>
        <tr style="position: sticky; top: 0; z-index: 1">
          <th style="z-index: 2; position: sticky; top: 0; left: 0"></th>
          <For each={filtered().items}>
            {(item) => (
              <th>
                <div class="item-icon-cell">
                  <ItemIcon item={item} />
                </div>
              </th>
            )}
          </For>
        </tr>
        <For each={filtered().items}>
          {(row) => (
            <tr>
              <th style="position: sticky; left: 0">
                <div class="item-icon-cell">
                  <ItemIcon item={row} />
                </div>
              </th>
              <For each={filtered().items}>
                {(column) => (
                  <td>
                    <Show when={filtered().resultMap.has2(row, column)}>
                      <div class="item-icon-cell">
                        <ItemIcon
                          item={filtered().resultMap.get(row, column)}
                        />
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
