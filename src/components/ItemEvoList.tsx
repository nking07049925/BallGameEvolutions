import { For } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import type { Evolution } from "../data/Evolutions";
import { ForSeparated } from "./ForSeparated";
import "./ItemEvoList.css";

export type ItemEvoListProps = {
  evolutions: Evolution[];
};
export const ItemEvoList = ({ evolutions }: ItemEvoListProps) => {
  return (
    <div class="item-evo-list">
      <For each={evolutions}>
        {({ items, result }) => (
          <div class="ingredients">
            <ForSeparated each={items} separator={<span class="x">×</span>}>
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
