import { Show } from "solid-js";
import { ItemCard } from "../components/ItemCard";
import { type Item } from "../data/Items";
import { ItemEvoTable } from "../components/ItemEvoTable";

export type ItemInfoProps = {
  item?: Item;
};

// TODO: Move other pages to this folder, nuke ItemInfo page, make a loadout explorer instead
// the idea: pick your current loadout and see possible evolutions paths from it
// (?shopping cart type ui for picking items?)

export const ItemInfo = (props: ItemInfoProps) => {
  const isBoring = () => {
    if (!props.item) return true;
    return !props.item.evolvesFrom.length && !props.item.synergizesWith.length;
  };

  return (
    <Show when={props.item} fallback={<h2>Invalid Item...</h2>}>
      <div style="width: min-content; min-width: 250px">
        <ItemCard item={props.item} />
      </div>
      <Show when={!isBoring()}>
        <ItemEvoTable items={[props.item!]} />
      </Show>
    </Show>
  );
};
