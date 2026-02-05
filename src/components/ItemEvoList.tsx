import { For } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import type { Evolution } from "../types/EvolutionInfo";
import { ForSeparated } from "./ForSeparated";
import "./ItemEvoList.css";

export type ItemEvoListProps = {
  evolutions: Evolution[];
};
export const ItemEvoList = ({ evolutions }: ItemEvoListProps) => {
  return (
    <table class="item-evo-list">
      <tbody>
        <tr>
          <th class="item-text">Ingredients</th>
          <th class="item-text">Result</th>
        </tr>
        <For each={evolutions}>
          {({ items, result }) => (
            <tr>
              <td class="ingredients">
                <ForSeparated each={items} separator="x">
                  {(item) => <ItemIcon item={item} />}
                </ForSeparated>
              </td>
              <td>
                <div class="item-icon-cell">
                  <ItemIcon item={result} />
                </div>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
