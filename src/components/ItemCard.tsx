import { Show } from "solid-js";
import type { Item } from "../data/Items";
import { ItemIcon } from "./ItemIcon";
import { ItemEvoList } from "./ItemEvoList";
import "./ItemCard.css";

export type ItemCardProps = {
  item?: Item;
};
export const ItemCard = (props: ItemCardProps) => (
  <div class="item-card">
    <h3 class="item-card-title">
      <ItemIcon item={props.item} size={32} />{" "}
      {props.item?.name ?? "Invalid Item"}
    </h3>
    <div class="item-card-content">
      {props.item?.description ?? "Whoops"}
      <Show when={props.item?.evolvesFrom.length}>
        <h4>Evolves from</h4>
        <ItemEvoList
          evolutions={props.item?.evolvesFrom ?? []}
          item={props.item}
        />
      </Show>
      <Show when={props.item?.synergizesWith.length}>
        <h4>Synergizes with</h4>
        <ItemEvoList
          evolutions={props.item?.synergizesWith ?? []}
          item={props.item}
        />
      </Show>
    </div>
  </div>
);
