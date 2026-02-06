import { ArrayDict, dictify, groupBy } from "../util/Data";
import { evolutionData, type RawEvolution } from "./EvolutionData";
import { itemData, type RawItem } from "./ItemData";
import { spriteDict, type SheetImage, type SpriteRegion } from "./Sprites";

export type ItemId = (typeof itemData)[number]["id"];

export type Item = RawItem<ItemId> & {
  spriteRegion: SpriteRegion;
  spriteImage: SheetImage;
  spriteImageUrl: string;
  evolvesInto: Evolution[];
  evolvesFrom: Evolution[];
};

// Items with sprites

export const items = itemData
  .map((item) => {
    const spriteInfo = spriteDict.get(item.id);
    if (!spriteInfo) {
      console.log(`missing sprite for ${item.name} (${item.id})`);
      return undefined;
    }

    const {
      sprite: { region },
      image,
      imageUrl,
    } = spriteInfo;

    return {
      ...item,
      spriteRegion: region,
      spriteImage: image,
      spriteImageUrl: imageUrl,
      evolvesFrom: [],
      evolvesInto: [],
    } as Item;
  })
  .filter((item): item is Item => item !== undefined);
const grouped = groupBy(items, (item) => item.type);
export const balls = grouped.get("ball") ?? [];
export const passives = grouped.get("passive") ?? [];

export const itemsDict = dictify(items, (item) => item.id);

// Evolutions

const logItem = (itemId: ItemId) =>
  `${itemId} "${itemsDict.get(itemId)?.name ?? "MISSING ITEM"}"`;
const logEvo = ({ items, result }: RawEvolution) =>
  `(${items.map(logItem).join(", ")}) => (${logItem(result)})`;

export type Evolution = {
  items: Item[];
  result: Item;
};
export const evolutions = evolutionData
  .map(({ items, result }) => {
    const mappedItems = items.map((itemId) => itemsDict.get(itemId));
    const mappedResult = itemsDict.get(result);

    if (mappedItems.some((item) => !item) || !mappedResult) {
      console.log(`Data error for evolution: ${logEvo}`);
      return;
    }

    return { items: mappedItems, result: mappedResult };
  })
  .filter((item): item is Evolution => item !== undefined);

const evolutionDict = groupBy(evolutions, (evo) => evo.result.type);
export const ballEvolutions = evolutionDict.get("ball") ?? [];
export const passiveEvolutions = evolutionDict.get("passive") ?? [];

export const evolvesInto = new ArrayDict<Item, Evolution>();
evolutions.forEach((evo) =>
  evo.items.forEach((item) => evolvesInto.add(item, evo)),
);
export const evolvesFrom = new ArrayDict<Item, Evolution>();
evolutions.forEach((evo) => evolvesFrom.add(evo.result, evo));

items.forEach((item) => {
  item.evolvesFrom = evolvesFrom.get(item) ?? [];
  item.evolvesInto = evolvesInto.get(item) ?? [];
});
