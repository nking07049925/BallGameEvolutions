import { For } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import type { Evolution, Item } from "../data/Items";
import { ForSeparated } from "./ForSeparated";
import "./ItemEvoList.css";

export type ItemEvoListProps = {
  evolutions: Evolution[];
  item?: Item;
};
export const ItemEvoList = (props: ItemEvoListProps) => {
  return (
    <div class="item-evo-list">
      <For each={props.evolutions}>
        {({ items, result }) => (
          <div class="item-evo-ingredients">
            <ForSeparated
              each={
                result !== props.item
                  ? [
                      props.item,
                      ...items.filter(
                        (ingredient) => ingredient !== props.item,
                      ),
                    ]
                  : items
              }
              separator={<span class="x">×</span>}
            >
              {(item) => <ItemIcon item={item} />}
            </ForSeparated>
            =
            <ItemIcon item={result} />
          </div>
        )}
      </For>
    </div>
  );
};
