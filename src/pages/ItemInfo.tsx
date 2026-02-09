import { ItemCard } from "../components/ItemCard";
import { type Item } from "../data/Items";
import { ItemEvoTable } from "../components/ItemEvoTable";

export type ItemInfoProps = {
  item?: Item;
};

// TODO: Move other pages to this folder, nuke ItemInfo page, make a loadout explorer instead
// the idea: pick your current loadout and see possible evolutions paths from it
// (?shopping cart type ui for picking items?)
// (?? move to preact ??)

export const ItemInfo = ({ item }: ItemInfoProps) => {
  if (!item) return <h2>Invalid Item...</h2>;
  // const isBoring = !item.evolvesFrom.length && !item.synergizesWith.length;

  return (
    <>
      <div style="width: min-content; min-width: 250px">
        <ItemCard item={item} />
      </div>
      {/* {!isBoring && <ItemEvoTable items={[item]} />} */}
    </>
  );
};
