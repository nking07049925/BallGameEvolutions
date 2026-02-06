import { dictify, groupBy } from "../util/Data";
import { spriteDict, type SheetImage, type SpriteRegion } from "./Sprites";

type RawItem<IDs extends string> = {
  id: IDs;
  type: "ball" | "passive";
  name: string;
  description: string;
  dependencies?: IDs[];
};

const typeWrap = <IDs extends string>(items: RawItem<IDs>[]) => items;

export type ItemId = (typeof itemData)[number]["id"];

export type Item =
  | RawItem<ItemId>
  | (RawItem<ItemId> & {
      spriteRegion: SpriteRegion;
      spriteImage: SheetImage;
      spriteImageUrl: string;
    });

export const itemData = typeWrap([
  {
    id: "assassin",
    name: "Assassin",
    description: "",
    type: "ball",
  },
  { id: "berserk", name: "Berserk", description: "", type: "ball" },
  {
    id: "black hole",
    name: "Black Hole",
    description: "",
    type: "ball",
  },
  { id: "bleed", name: "Bleed", description: "", type: "ball" },
  {
    id: "blizzard",
    name: "Blizzard",
    description: "",
    type: "ball",
  },
  { id: "bomb", name: "Bomb", description: "", type: "ball" },
  {
    id: "brood mother",
    name: "Brood Mother",
    description: "",
    type: "ball",
  },
  { id: "burn", name: "Burn", description: "", type: "ball" },
  { id: "cell", name: "Cell", description: "", type: "ball" },
  { id: "charm", name: "Charm", description: "", type: "ball" },
  { id: "dark", name: "Dark", description: "", type: "ball" },
  {
    id: "earthquake",
    name: "Earthquake",
    description: "",
    type: "ball",
  },
  { id: "egg sac", name: "Egg Sac", description: "", type: "ball" },
  { id: "flash", name: "Flash", description: "", type: "ball" },
  { id: "flicker", name: "Flicker", description: "", type: "ball" },
  {
    id: "freeze ray",
    name: "Freeze Ray",
    description: "",
    type: "ball",
  },
  { id: "freeze", name: "Freeze", description: "", type: "ball" },
  {
    id: "frozen flame",
    name: "Frozen Flame",
    description: "",
    type: "ball",
  },
  { id: "ghost", name: "Ghost", description: "", type: "ball" },
  { id: "glacier", name: "Glacier", description: "", type: "ball" },
  {
    id: "hemorrhage",
    name: "Hemorrhage",
    description: "",
    type: "ball",
  },
  {
    id: "holy laser",
    name: "Holy Laser",
    description: "",
    type: "ball",
  },
  { id: "incubus", name: "Incubus", description: "", type: "ball" },
  { id: "inferno", name: "Inferno", description: "", type: "ball" },
  { id: "iron", name: "Iron", description: "", type: "ball" },
  {
    id: "laser (horizontal)",
    name: "Horizontal Laser",
    description: "",
    type: "ball",
  },
  {
    id: "laser (vertical)",
    name: "Vertical Laser",
    description: "",
    type: "ball",
  },
  {
    id: "laser beam",
    name: "Laser Beam",
    description: "",
    type: "ball",
  },
  { id: "leech", name: "Leech", description: "", type: "ball" },
  { id: "light", name: "Light", description: "", type: "ball" },
  {
    id: "lightning rod",
    name: "Lightning Rod",
    description: "",
    type: "ball",
  },
  {
    id: "lightning",
    name: "Lightning",
    description: "",
    type: "ball",
  },
  {
    id: "lovestruck",
    name: "Lovestruck",
    description: "",
    type: "ball",
  },
  { id: "maggot", name: "Maggot", description: "", type: "ball" },
  { id: "magma", name: "Magma", description: "", type: "ball" },
  {
    id: "mosquito king",
    name: "Mosquito King",
    description: "",
    type: "ball",
  },
  {
    id: "mosquito swarm",
    name: "Mosquito Swarm",
    description: "",
    type: "ball",
  },
  {
    id: "nosferatu",
    name: "Nosferatu",
    description: "",
    type: "ball",
  },
  { id: "noxious", name: "Noxious", description: "", type: "ball" },
  {
    id: "nuclear bomb",
    name: "Nuclear Bomb",
    description: "",
    type: "ball",
  },
  {
    id: "overgrowth",
    name: "Overgrowth",
    description: "",
    type: "ball",
  },
  { id: "phantom", name: "Phantom", description: "", type: "ball" },
  { id: "poison", name: "Poison", description: "", type: "ball" },
  {
    id: "radiation beam",
    name: "Radiation Beam",
    description: "",
    type: "ball",
  },
  {
    id: "sacrifice",
    name: "Sacrifice",
    description: "",
    type: "ball",
  },
  {
    id: "sandstorm",
    name: "Sandstorm",
    description: "",
    type: "ball",
  },
  { id: "satan", name: "Satan", description: "", type: "ball" },
  { id: "shotgun", name: "Shotgun", description: "", type: "ball" },
  {
    id: "soul sucker",
    name: "Soul Sucker",
    description: "",
    type: "ball",
  },
  {
    id: "spider queen",
    name: "Spider Queen",
    description: "",
    type: "ball",
  },
  { id: "storm", name: "Storm", description: "", type: "ball" },
  {
    id: "succubus",
    name: "Succubus",
    description: "",
    type: "ball",
  },
  { id: "sun", name: "Sun", description: "", type: "ball" },
  { id: "swamp", name: "Swamp", description: "", type: "ball" },
  {
    id: "vampire lord",
    name: "Vampire Lord",
    description: "",
    type: "ball",
  },
  { id: "vampire", name: "Vampire", description: "", type: "ball" },
  { id: "virus", name: "Virus", description: "", type: "ball" },
  {
    id: "voluptuous egg sac",
    name: "Voluptuous Egg Sac",
    description: "",
    type: "ball",
  },
  { id: "wind", name: "Wind", description: "", type: "ball" },
  { id: "wraith", name: "Wraith", description: "", type: "ball" },
  {
    id: "archers effigy",
    name: "Archers Effigy",
    description: "",
    type: "passive",
  },
  {
    id: "artificial heart",
    name: "Artificial Heart",
    description: "",
    type: "passive",
  },
  {
    id: "baby rattle",
    name: "Baby Rattle",
    description: "",
    type: "passive",
  },
  {
    id: "bandage roll",
    name: "Bandage Roll",
    description: "",
    type: "passive",
  },
  {
    id: "bottled tornado",
    name: "Bottled Tornado",
    description: "",
    type: "passive",
  },
  {
    id: "breastplate",
    name: "Breastplate",
    description: "",
    type: "passive",
  },
  {
    id: "cornucopia",
    name: "Cornucopia",
    description: "",
    type: "passive",
  },
  {
    id: "crown of thorns",
    name: "Crown Of Thorns",
    description: "",
    type: "passive",
  },
  {
    id: "cursed elixir",
    name: "Cursed Elixir",
    description: "",
    type: "passive",
  },
  {
    id: "deadeyes amulet",
    name: "Deadeyes Amulet",
    description: "",
    type: "passive",
  },
  {
    id: "deadeyes cross",
    name: "Deadeyes Cross",
    description: "",
    type: "passive",
  },
  {
    id: "diamond hilted dagger",
    name: "Diamond Hilted Dagger",
    description: "",
    type: "passive",
  },
  {
    id: "dynamite",
    name: "Dynamite",
    description: "",
    type: "passive",
  },
  {
    id: "emerald hilted dagger",
    name: "Emerald Hilted Dagger",
    description: "",
    type: "passive",
  },
  {
    id: "ethereal cloak",
    name: "Ethereal Cloak",
    description: "",
    type: "passive",
  },
  {
    id: "everflowing goblet",
    name: "Everflowing Goblet",
    description: "",
    type: "passive",
  },
  {
    id: "eye of the beholder",
    name: "Eye Of The Beholder",
    description: "",
    type: "passive",
  },
  {
    id: "fleet feet",
    name: "Fleet Feet",
    description: "",
    type: "passive",
  },
  {
    id: "frozen spike",
    name: "Frozen Spike",
    description: "",
    type: "passive",
  },
  {
    id: "gemspring",
    name: "Gemspring",
    description: "",
    type: "passive",
  },
  {
    id: "ghostly corset",
    name: "Ghostly Corset",
    description: "",
    type: "passive",
  },
  {
    id: "ghostly shield",
    name: "Ghostly Shield",
    description: "",
    type: "passive",
  },
  {
    id: "golden bull",
    name: "Golden Bull",
    description: "",
    type: "passive",
  },
  {
    id: "gracious impaler",
    name: "Gracious Impaler",
    description: "",
    type: "passive",
  },
  {
    id: "hand fan",
    name: "Hand Fan",
    description: "",
    type: "passive",
  },
  {
    id: "hand mirror",
    name: "Hand Mirror",
    description: "",
    type: "passive",
  },
  {
    id: "healers effigy",
    name: "Healers Effigy",
    description: "",
    type: "passive",
  },
  {
    id: "hourglass",
    name: "Hourglass",
    description: "",
    type: "passive",
  },
  {
    id: "kiss of death",
    name: "Kiss Of Death",
    description: "",
    type: "passive",
  },
  {
    id: "lovers quiver",
    name: "Lovers Quiver",
    description: "",
    type: "passive",
  },
  {
    id: "magic staff",
    name: "Magic Staff",
    description: "",
    type: "passive",
  },
  {
    id: "magnet",
    name: "Magnet",
    description: "",
    type: "passive",
  },
  {
    id: "midnight oil",
    name: "Midnight Oil",
    description: "",
    type: "passive",
  },
  {
    id: "odiferous shell",
    name: "Odiferous Shell",
    description: "",
    type: "passive",
  },
  {
    id: "phantom regalia",
    name: "Phantom Regalia",
    description: "",
    type: "passive",
  },
  {
    id: "pressure valve",
    name: "Pressure Valve",
    description: "",
    type: "passive",
  },
  {
    id: "protective charm",
    name: "Protective Charm",
    description: "",
    type: "passive",
  },
  {
    id: "radiant feather",
    name: "Radiant Feather",
    description: "",
    type: "passive",
  },
  {
    id: "reachers spear",
    name: "Reachers Spear",
    description: "",
    type: "passive",
  },
  {
    id: "rubber headband",
    name: "Rubber Headband",
    description: "",
    type: "passive",
  },
  {
    id: "ruby hilted dagger",
    name: "Ruby Hilted Dagger",
    description: "",
    type: "passive",
  },
  {
    id: "sapphire hilted dagger",
    name: "Sapphire Hilted Dagger",
    description: "",
    type: "passive",
  },
  {
    id: "shortbow",
    name: "Shortbow",
    description: "",
    type: "passive",
  },
  {
    id: "silver blindfold",
    name: "Silver Blindfold",
    description: "",
    type: "passive",
  },
  {
    id: "silver bullet",
    name: "Silver Bullet",
    description: "",
    type: "passive",
  },
  {
    id: "slingshot",
    name: "Slingshot",
    description: "",
    type: "passive",
  },
  {
    id: "soul reaver",
    name: "Soul Reaver",
    description: "",
    type: "passive",
  },
  {
    id: "spiked collar",
    name: "Spiked Collar",
    description: "",
    type: "passive",
  },
  {
    id: "stone effigy",
    name: "Stone Effigy",
    description: "",
    type: "passive",
  },
  {
    id: "tormenters mask",
    name: "Tormenters Mask",
    description: "",
    type: "passive",
  },
  {
    id: "traitors cowl",
    name: "Traitors Cowl",
    description: "",
    type: "passive",
  },
  {
    id: "turret",
    name: "Turret",
    description: "",
    type: "passive",
  },
  {
    id: "upturned hatchet",
    name: "Upturned Hatchet",
    description: "",
    type: "passive",
  },
  {
    id: "vampiric sword",
    name: "Vampiric Sword",
    description: "",
    type: "passive",
  },
  {
    id: "voodoo doll",
    name: "Voodoo Doll",
    description: "",
    type: "passive",
  },
  {
    id: "wagon wheel",
    name: "Wagon Wheel",
    description: "",
    type: "passive",
  },
  {
    id: "war horn",
    name: "War Horn",
    description: "",
    type: "passive",
  },
  {
    id: "wings of the anointed",
    name: "Wings Of The Anointed",
    description: "",
    type: "passive",
  },
  {
    id: "wretched onion",
    name: "Wretched Onion",
    description: "",
    type: "passive",
  },
  {
    id: "armageddon",
    name: "Armageddon",
    description: "",
    type: "ball",
  },
  { id: "banshee", name: "Banshee", description: "", type: "ball" },
  {
    id: "brimstone",
    name: "Brimstone",
    description: "",
    type: "ball",
  },
  {
    id: "catapult",
    name: "Catapult",
    description: "",
    type: "ball",
  },
  {
    id: "darkflame",
    name: "Darkflame",
    description: "",
    type: "ball",
  },
  { id: "drill", name: "Drill", description: "", type: "ball" },
  {
    id: "elemental",
    name: "Elemental",
    description: "",
    type: "ball",
  },
  { id: "Erosion", name: "Erosion", description: "", type: "ball" },
  { id: "firefly", name: "Firefly", description: "", type: "ball" },
  {
    id: "fireworks",
    name: "Fireworks",
    description: "",
    type: "ball",
  },
  { id: "flesh", name: "Flesh", description: "", type: "ball" },
  {
    id: "fleshmound",
    name: "Fleshmound",
    description: "",
    type: "ball",
  },
  {
    id: "hearteater",
    name: "Hearteater",
    description: "",
    type: "ball",
  },
  {
    id: "landslide",
    name: "Landslide",
    description: "",
    type: "ball",
  },
  {
    id: "lasercutter",
    name: "Lasercutter",
    description: "",
    type: "ball",
  },
  {
    id: "mosquitokingdom",
    name: "Mosquitokingdom",
    description: "",
    type: "ball",
  },
  {
    id: "offspring",
    name: "Offspring",
    description: "",
    type: "ball",
  },
  { id: "petrify", name: "Petrify", description: "", type: "ball" },
  { id: "reaper", name: "Reaper", description: "", type: "ball" },
  { id: "sniper", name: "Sniper", description: "", type: "ball" },
  { id: "steel", name: "Steel", description: "", type: "ball" },
  { id: "stone", name: "Stone", description: "", type: "ball" },
  { id: "Time", name: "Time", description: "", type: "ball" },
  {
    id: "timebomb",
    name: "Timebomb",
    description: "",
    type: "ball",
  },
  {
    id: "timestop",
    name: "Timestop",
    description: "",
    type: "ball",
  },
  { id: "tumor", name: "Tumor", description: "", type: "ball" },
  { id: "venom", name: "Venom", description: "", type: "ball" },
  { id: "warp", name: "Warp", description: "", type: "ball" },
  { id: "xray", name: "Xray", description: "", type: "ball" },
  { id: "zombie", name: "Zombie", description: "", type: "ball" },
  { id: "arrow", name: "Arrow", description: "", type: "passive" },
  { id: "artillery", name: "Artillery", description: "", type: "passive" },
  { id: "detonator", name: "Detonator", description: "", type: "passive" },
  { id: "dumbbell", name: "Dumbbell", description: "", type: "passive" },
  { id: "hammer", name: "Hammer", description: "", type: "passive" },
  { id: "impaler", name: "Impaler", description: "", type: "passive" },
  { id: "irononesie", name: "Irononesie", description: "", type: "passive" },
  { id: "rapier", name: "Rapier", description: "", type: "passive" },
  { id: "stopwatch", name: "Stopwatch", description: "", type: "passive" },
  {
    id: "swordbreaker",
    name: "Swordbreaker",
    description: "",
    type: "passive",
  },
  { id: "tire", name: "Tire", description: "", type: "passive" },
  { id: "windweaver", name: "Windweaver", description: "", type: "passive" },
]);

export const items = itemData.map<Item>((item) => {
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
export const balls = grouped.get("ball") ?? [];
export const passives = grouped.get("passive") ?? [];

export const itemsDict = dictify(items, (item) => item.id);
