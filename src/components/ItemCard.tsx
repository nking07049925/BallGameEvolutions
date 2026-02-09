import type { Item } from "../data/Items";
import { ItemIcon } from "./ItemIcon";
import { ItemEvoList } from "./ItemEvoList";
import "./ItemCard.css";
import type { CSSProperties } from "preact";

export type ItemCardProps = {
  item?: Item;
  style?: string | CSSProperties;
};
export const ItemCard = ({ item, style }: ItemCardProps) => {
  if (!item) return <h3>Invalid Item</h3>;

  return (
    <div class="item-card" style={style}>
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
