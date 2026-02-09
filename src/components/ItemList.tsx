import { ItemIcon } from "./ItemIcon";
import type { Item } from "../data/Items";
import "./ItemList.css";

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
          <th class="item-text" style="min-width: 256px">
            Description
          </th>
          <th
            class="item-text"
            title="How many evolutions this item takes part in"
          >
            Evo
          </th>
          <th class="item-text" title="How many evolutions result in this item">
            Res
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr>
            <td>
              <div class="item-icon-cell">
                <ItemIcon item={item} />
              </div>
            </td>
            <td class="item-text">{item.name}</td>
            <td class="item-text">{item.description}</td>
            <td class="item-text">{item.synergizesWith.length || ""}</td>
            <td class="item-text">{item.evolvesFrom.length || ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
