import "./App.css";
import itemSchema from "./assets/schema/itemSchema.json";
import sheetSchema from "./assets/schema/sheetSchema.json";
import type { RawEvolution, RawItem } from "./types/ItemSchema";
import type { SpriteSheet } from "./types/SpriteSheetSchema";
import { dictify, groupBy } from "./util/Data";
import type { Item } from "./types/ItemSchema";
// import { ItemIcon } from "./components/ItemIcon";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoList } from "./components/ItemEvoList";
import type { Evolution } from "./types/EvolutionInfo";
import { ItemEvoTree } from "./components/ItemEvoTree";
const itemData = itemSchema.items as RawItem[];
const evolutionData: RawEvolution[] = itemSchema.evolutions;
const sheetData = sheetSchema.sheets as SpriteSheet[];

const spriteList = sheetData.flatMap((sheet) => {
  const imageUrl = new URL(
    `./assets/img/${sheet.image.location}`,
    import.meta.url,
  ).href;
  return sheet.sprites.map((sprite) => ({
    sprite,
    image: sheet.image,
    imageUrl,
  }));
});
const spriteDict = dictify(spriteList, (info) => info.sprite.id);

const items = itemData.map<Item>((item) => {
  const spriteInfo = spriteDict.get(item.id);
  if (!spriteInfo) {
    console.log(`missing sprite for ${item.name} (${item.id})`);
    return item;
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
  };
});

const grouped = groupBy(items, (item) => item.type);
const balls = grouped.get("ball") ?? [];
const equipment = grouped.get("equipment") ?? [];

const itemsDict = dictify(items, (item) => item.id);

const logItem = (itemId: string) =>
  `${itemId} "${itemsDict.get(itemId)?.name ?? "MISSING ITEM"}"`;
const logEvo = ({ items, result }: RawEvolution) =>
  `(${items.map(logItem).join(", ")}) => (${logItem(result)})`;

const evolutions: Evolution[] = evolutionData.map(({ items, result }) => ({
  items: items.map((itemId) => itemsDict.get(itemId)!),
  result: itemsDict.get(result)!,
}));
function App() {
  return (
    <>
      <h1>Ball x Game evolutions or whatever</h1>
      <h3>All items</h3>
      <h4>Balls</h4>
      <ItemList items={balls} />
      <h4>Equipment</h4>
      <ItemList items={equipment} />
      <h3>Boring flat list</h3>
      <ItemEvoList evolutions={evolutions} />
      <h3>Evolution table</h3>
      <h4>Balls</h4>
      <ItemEvoTable items={balls} evolutions={evolutions} />
      <h4>Equipment</h4>
      <ItemEvoTable items={equipment} evolutions={evolutions} />
      <h3>Evolution tree</h3>
      <ItemEvoTree evolutions={evolutions} />
    </>
  );
}

export default App;
