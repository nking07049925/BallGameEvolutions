import { groupBy } from "../util/Data";
import { itemsDict, type Item, type ItemId } from "./Items";

type RawEvolution = {
  items: ItemId[];
  result: ItemId;
};
export type Evolution = {
  items: Item[];
  result: Item;
};

const logItem = (itemId: ItemId) =>
  `${itemId} "${itemsDict.get(itemId)?.name ?? "MISSING ITEM"}"`;
const logEvo = ({ items, result }: RawEvolution) =>
  `(${items.map(logItem).join(", ")}) => (${logItem(result)})`;

const evolutionData: RawEvolution[] = [
  { items: ["bleed", "vampire"], result: "vampire lord" },
  { items: ["bleed", "brood mother"], result: "leech" },
  { items: ["bleed", "poison"], result: "virus" },
  { items: ["bleed", "charm"], result: "berserk" },
  { items: ["bleed", "dark"], result: "sacrifice" },
  { items: ["bleed", "iron"], result: "hemorrhage" },

  { items: ["brood mother", "egg sac"], result: "spider queen" },
  { items: ["brood mother", "vampire"], result: "mosquito king" },
  { items: ["brood mother", "cell"], result: "maggot" },

  { items: ["burn", "iron"], result: "bomb" },
  { items: ["burn", "earthquake"], result: "magma" },
  { items: ["burn", "wind"], result: "inferno" },
  { items: ["burn", "charm"], result: "berserk" },
  { items: ["burn", "light"], result: "sun" },
  { items: ["burn", "freeze"], result: "frozen flame" },
  { items: ["burn", "dark"], result: "darkflame" },
  { items: ["burn", "egg sac"], result: "fireworks" },
  { items: ["burn", "stone"], result: "brimstone" },

  { items: ["cell", "poison"], result: "virus" },
  { items: ["cell", "egg sac"], result: "voluptuous egg sac" },
  { items: ["cell", "laser (horizontal)"], result: "radiation beam" },
  { items: ["cell", "laser (vertical)"], result: "radiation beam" },
  { items: ["cell", "earthquake"], result: "overgrowth" },

  { items: ["charm", "vampire"], result: "succubus" },
  { items: ["charm", "dark"], result: "incubus" },
  { items: ["charm", "light"], result: "lovestruck" },

  { items: ["dark", "vampire"], result: "vampire lord" },
  { items: ["dark", "iron"], result: "assassin" },
  { items: ["dark", "ghost"], result: "phantom" },
  { items: ["dark", "sun"], result: "black hole" },
  { items: ["dark", "wind"], result: "noxious" },
  { items: ["dark", "light"], result: "flicker" },

  { items: ["earthquake", "stone"], result: "landslide" },
  { items: ["earthquake", "poison"], result: "swamp" },
  { items: ["earthquake", "freeze"], result: "glacier" },
  { items: ["earthquake", "wind"], result: "sandstorm" },

  { items: ["egg sac", "vampire"], result: "mosquito swarm" },
  { items: ["egg sac", "iron"], result: "shotgun" },
  { items: ["egg sac", "stone"], result: "catapult" },

  { items: ["freeze", "ghost"], result: "wraith" },
  { items: ["freeze", "lightning"], result: "blizzard" },
  { items: ["freeze", "laser (horizontal)"], result: "freeze ray" },
  { items: ["freeze", "laser (vertical)"], result: "freeze ray" },
  { items: ["freeze", "stone"], result: "glacier" },

  { items: ["ghost", "iron"], result: "assassin" },
  { items: ["ghost", "poison"], result: "virus" },
  { items: ["ghost", "vampire"], result: "soul sucker" },

  { items: ["iron", "stone"], result: "steel" },
  { items: ["iron", "lightning"], result: "lightning rod" },

  { items: ["laser (horizontal)", "laser (vertical)"], result: "holy laser" },
  { items: ["laser (horizontal)", "light"], result: "laser beam" },
  { items: ["laser (horizontal)", "steel"], result: "lasercutter" },

  { items: ["laser (vertical)", "light"], result: "laser beam" },
  { items: ["laser (vertical)", "steel"], result: "lasercutter" },

  { items: ["light", "lightning"], result: "flash" },

  { items: ["lightning", "wind"], result: "storm" },

  { items: ["poison", "bomb"], result: "nuclear bomb" },
  { items: ["poison", "wind"], result: "noxious" },

  { items: ["wind", "stone"], result: "sandstorm" },
  { items: ["succubus", "incubus"], result: "satan" },
  {
    items: ["vampire lord", "spider queen", "mosquito king"],
    result: "nosferatu",
  },

  { items: ["baby rattle", "war horn"], result: "cornucopia" },
  { items: ["wretched onion", "breastplate"], result: "odiferous shell" },
  { items: ["spiked collar", "crown of thorns"], result: "tormenters mask" },
  { items: ["reachers spear", "deadeyes amulet"], result: "gracious impaler" },
  { items: ["turret", "hand fan"], result: "artillery" },
  { items: ["vampiric sword", "everflowing goblet"], result: "soul reaver" },
  { items: ["ghostly corset", "ethereal cloak"], result: "phantom regalia" },
  { items: ["radiant feather", "fleet feet"], result: "wings of the anointed" },
  {
    items: [
      "ruby hilted dagger",
      "diamond hilted dagger",
      "sapphire hilted dagger",
      "emerald hilted dagger",
    ],
    result: "deadeyes cross",
  },
  { items: ["deadeyes cross", "gracious impaler"], result: "impaler" },
];

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
