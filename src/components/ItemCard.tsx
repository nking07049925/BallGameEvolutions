import type { Item } from "../data/Items";
import { ItemIcon } from "./ItemIcon";
import { ItemEvoList } from "./ItemEvoList";
import "./ItemCard.css";

export type ItemCardProps = {
  item?: Item;
};
export const ItemCard = ({ item }: ItemCardProps) => {
  if (!item) return <h3>Invalid Item</h3>;

  return (
    <div class="item-card">
      <h3 class="item-card-title">
        <ItemIcon item={item} size={32} /> {item.name}
      </h3>
      <div class="item-card-content">
        {item.description}
        {!!item.evolvesFrom.length && (
          <>
            <h4>Evolves from</h4>
            <ItemEvoList evolutions={item.evolvesFrom} item={item} />
          </>
        )}
        {!!item.synergizesWith.length && (
          <>
            <h4>Synergizes with</h4>
            <ItemEvoList evolutions={item.synergizesWith} item={item} />
          </>
        )}
      </div>
    </div>
  );
};
