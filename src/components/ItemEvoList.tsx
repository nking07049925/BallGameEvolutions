import { ItemIcon } from "./ItemIcon";
import { type Evolution, type Item } from "../data/Items";
import { ListSeparated } from "./ListSeparated";
import "./ItemEvoList.css";

export type ItemEvoListProps = {
  evolutions: Evolution[];
  item?: Item;
};

export const ItemEvoList = ({ evolutions, item }: ItemEvoListProps) => {
  const filterItems = ({ items, result }: Evolution) =>
    result === item
      ? items
      : [item, ...items.filter((ingredient) => ingredient !== item)];

  return (
    <div class="item-evo-list">
      {evolutions.map((evolution) => (
        <div class="item-evo-ingredients">
          <ListSeparated separator={<span class="separator">×</span>}>
            {filterItems(evolution).map((ingredient) => (
              <ItemIcon item={ingredient} showPopover={ingredient !== item} />
            ))}
          </ListSeparated>
          <span class="separator">=</span>
          <ItemIcon
            item={evolution.result}
            showPopover={evolution.result !== item}
          />
        </div>
      ))}
    </div>
  );
};
