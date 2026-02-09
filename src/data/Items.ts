import { ArrayDict, dictify, filterTruthy, groupBy } from "../util/Data";
import { evolutionData, type RawEvolution } from "./EvolutionData";
import { itemData, type RawItem } from "./ItemData";
import { spriteDict, type SheetImage, type SpriteRegion } from "./Sprites";

export type ItemId = (typeof itemData)[number]["id"];

export type Item = RawItem<ItemId> & {
  spriteRegion: SpriteRegion;
  spriteImage: SheetImage;
  spriteImageUrl: string;
  /** Item is an ingredient in these */
  synergizesWith: Evolution[];
  /** Item is the result of these */
  evolvesFrom: Evolution[];
  maxEvoDepth: number;
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
      synergizesWith: [],
      maxEvoDepth: 0,
    } as Item;
  })
  .filter(filterTruthy);
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
  items: [Item, Item, ...Item[]];
  result: Item;
};
export const evolutions = evolutionData
  .map((evolution) => {
    const { items, result } = evolution;
    const mappedItems = items.map((itemId) => itemsDict.get(itemId));
    const mappedResult = itemsDict.get(result);

    if (mappedItems.some((item) => !item) || !mappedResult) {
      console.log(`Data error for evolution: ${logEvo(evolution)}`);
      return;
    }

    return { items: mappedItems, result: mappedResult } as Evolution;
  })
  .filter(filterTruthy);

export const synergizesWith = new ArrayDict<Item, Evolution>();
evolutions.forEach((evo) =>
  evo.items.forEach((item) => synergizesWith.add(item, evo)),
);
export const evolvesFrom = new ArrayDict<Item, Evolution>();
evolutions.forEach((evo) => evolvesFrom.add(evo.result, evo));

const calcMaxEvoDepth = (item: Item): number => {
  return (item.maxEvoDepth ||=
    1 +
    item.evolvesFrom
      .flatMap((evo) => evo.items)
      .reduce((total, item) => Math.max(total, calcMaxEvoDepth(item)), 0));
};

items.forEach((item) => {
  item.evolvesFrom = evolvesFrom.get(item) ?? [];
  item.synergizesWith = synergizesWith.get(item) ?? [];
});
items.forEach((item) => {
  item.maxEvoDepth ||= calcMaxEvoDepth(item);
});
items.sort((a, b) => a.maxEvoDepth - b.maxEvoDepth);
balls.sort((a, b) => a.maxEvoDepth - b.maxEvoDepth);
passives.sort((a, b) => a.maxEvoDepth - b.maxEvoDepth);

export const evolutionsFromItem = (item: Item) => [
  ...item.evolvesFrom,
  ...item.synergizesWith,
];
export const itemsFromEvolution = (evo: Evolution) => [
  evo.result,
  ...evo.items,
];
