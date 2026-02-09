import { ItemIcon } from "./ItemIcon";
import type { Item } from "../data/Items";
import "./ItemList.css";
import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { joinClassNames } from "../util/Data";

export type ItemListProps = {
  items: Item[];
};

type Column = {
  title: ComponentChildren;
  titleStyle?: string;
  render: (item: Item) => ComponentChildren;
  cellClass?: string;
  sort?: (a: Item, b: Item) => number;
};

const columns: Column[] = [
  {
    title: undefined,
    render: (item) => (
      <div class="item-icon-cell">
        <ItemIcon item={item} showPopover />
      </div>
    ),
    cellClass: "",
  },
  {
    title: "Name",
    render: (item) => item.name,
  },
  {
    title: "Description",
    titleStyle: "minWidth: 256px",
    render: (item) => item.description,
  },
  {
    title: "Synergies",
    render: (item) => item.synergizesWith.length || "",
    sort: (a, b) => a.synergizesWith.length - b.synergizesWith.length,
  },
  {
    title: "Evolutions",
    render: (item) => item.evolvesFrom.length || "",
    sort: (a, b) => a.evolvesFrom.length - b.evolvesFrom.length,
  },
  {
    title: "Depth",
    render: (item) => item.maxEvoDepth - 1 || "",
    sort: (a, b) => a.maxEvoDepth - b.maxEvoDepth,
  },
];

export const ItemList = ({ items }: ItemListProps) => {
  const [
    { sorted: sortedItems, direction: sortDirection, column: sortColumn },
    setSorted,
  ] = useState<{
    sorted: Item[];
    direction: number;
    column?: Column;
  }>({
    sorted: items,
    direction: 1,
  });

  return (
    <table class="item-list">
      <thead>
        <tr>
          {columns.map((column) => {
            const { title, sort } = column;
            return (
              <th
                class={joinClassNames("item-text", !!sort && "sortable")}
                onClick={() => {
                  if (!sort) return;
                  const direction = column === sortColumn ? -sortDirection : -1;
                  const sorted = [...sortedItems].sort(
                    (a, b) =>
                      direction * sort(a, b) || a.name.localeCompare(b.name),
                  );
                  setSorted({ sorted, direction, column });
                }}
              >
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
          <tr>
            {columns.map(({ render, cellClass }) => (
              <td class={cellClass ?? "item-text"}>{render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
