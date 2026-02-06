import { For } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import type { Item } from "../data/Items";

export type ItemListProps = {
  items: Item[];
};
export const ItemList = ({ items }: ItemListProps) => {
  return (
    <table class="item-list">
      <thead>
        <tr>
          <th></th>
          <th class="item-text">Name</th>
          <th class="item-text">Description</th>
        </tr>
      </thead>
      <tbody>
        <For each={items}>
          {(item) => (
            <tr>
              <td>
                <div class="item-icon-cell">
                  <ItemIcon item={item} />
                </div>
              </td>
              <td class="item-text">{item.name}</td>
              <td class="item-text">{item.description}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
