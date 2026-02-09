import { ItemCard } from "../components/ItemCard";
import { type Item } from "../data/Items";
// import { ItemEvoTable } from "../components/ItemEvoTable";

export type ItemInfoProps = {
  item?: Item;
};

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
