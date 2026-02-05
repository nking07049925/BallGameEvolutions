import "./App.css";
import itemSchema from "./assets/schema/itemSchema.json";
import sheetSchema from "./assets/schema/sheetSchema.json";
import type { RawEvolution, RawItem } from "./types/ItemSchema";
import type { SpriteSheet } from "./types/SpriteSheetSchema";
import { dictify } from "./util/Data";
import type { Item } from "./types/ItemSchema";
// import { ItemIcon } from "./components/ItemIcon";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoList } from "./components/ItemEvoList";
import type { Evolution } from "./types/EvolutionInfo";
import { ItemEvoTree } from "./components/ItemEvoTree";
const itemData: RawItem[] = itemSchema.items;
const evolutionData: RawEvolution[] = itemSchema.evolutions;
const sheetData: SpriteSheet[] = sheetSchema.sheets;

const spriteList = sheetData.flatMap((sheet) => {
  const imageUrl = new URL(sheet.image.location, import.meta.url).href;
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
      <ItemList items={items} />
      <h3>Boring flat list</h3>
      <ItemEvoList evolutions={evolutions} />
      <h3>Evolution table</h3>
      <ItemEvoTable items={items} evolutions={evolutions} />
      <h3>Evolution tree</h3>
      <ItemEvoTree evolutions={evolutions} />
    </>
  );
}

export default App;
