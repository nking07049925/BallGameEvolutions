import { ItemIcon } from "./ItemIcon";
import { Map2 } from "../util/Data";
import { type Item, evolutionsFromItem } from "../data/Items";

export type ItemEvoTableProps = {
  items: Item[];
};

export const ItemEvoTable = ({ items }: ItemEvoTableProps) => {
  const resultMap = items
    .flatMap(evolutionsFromItem)
    .filter(({ items }) => items.length == 2)
    .reduce(
      (map, { items: [first, second], result }) =>
        map.set(first, second, result).set(second, first, result),
      new Map2<Item, Item, Item>(),
    );

  const filtered = [...resultMap.keys()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <table class="item-evo-table">
      <tbody>
        <tr style="position: sticky; top: 0; z-index: 1">
          <th style="z-index: 2; position: sticky; top: 0; left: 0"></th>
          {filtered.map((item) => (
            <th>
              <div class="item-icon-cell">
                <ItemIcon item={item} showPopover />
              </div>
            </th>
          ))}
        </tr>
        {filtered.map((row) => (
          <tr>
            <th style="position: sticky; left: 0">
              <div class="item-icon-cell">
                <ItemIcon item={row} showPopover />
              </div>
            </th>
            {filtered.map((column) => {
              const item = resultMap.get(row, column);

              return (
                <td>
                  {item && (
                    <div class="item-icon-cell">
                      <ItemIcon item={item} showPopover />
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
