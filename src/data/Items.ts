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
  // { id: "armageddon", name: "Armageddon", description: "", type: "ball" },
  {
    id: "assassin",
    name: "Assassin",
    description:
      "Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage.",
    type: "ball",
  },
  // { id: "banshee", name: "Banshee", description: "", type: "ball" },
  {
    id: "berserk",
    name: "Berserk",
    description:
      "Each hit has a 30% chance of causing enemies to go berserk for 6 seconds. Berserk enemies deal 15-24 damage to adjacent enemies every second.",
    type: "ball",
  },
  {
    id: "black hole",
    name: "Black Hole",
    description:
      "Instantly kills the first non-boss enemy that it hits, but destroys itself afterwards. Has a 7 second cooldown before it can be shot again.",
    type: "ball",
  },
  {
    id: "bleed",
    name: "Bleed",
    description:
      "Inflicts 2 stacks of bleed. Bleeding enemies receive 1 damage per stack when hit by a ball (max 8 stacks).",
    type: "ball",
  },
  {
    id: "blizzard",
    name: "Blizzard",
    description:
      "Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage.",
    type: "ball",
  },
  {
    id: "bomb",
    name: "Bomb",
    description:
      "Explodes when hitting an enemy, dealing 150-300 damage to nearby enemies. Has a 3 second cooldown before it can be shot again.",
    type: "ball",
  },
  {
    id: "brimstone",
    name: "Brimstone",
    description:
      "Applies 1 stack of burn and poison every second to all enemies within a 2 tile radius (max 4 stacks). Burn deals 1-4 damage per stack per second and poison deals 2-3 damage per stack per second.",
    type: "ball",
  },
  {
    id: "brood mother",
    name: "Brood Mother",
    description:
      "Has a 25% chance of birthing a baby ball each time it hits an enemy.",
    type: "ball",
  },
  {
    id: "burn",
    name: "Burn",
    description:
      "Add 1 stack of burn on hit for 3 seconds (max 3 stacks). Burnt units are dealt 4-8 damage per stack per second.",
    type: "ball",
  },
  {
    id: "catapult",
    name: "Catapult",
    description:
      "Launches 3-5 stone baby balls every 1.5 seconds, which are destroyed after hitting anything.",
    type: "ball",
  },
  {
    id: "cell",
    name: "Cell",
    description: "Splits into a clone on hit 2 times.",
    type: "ball",
  },
  {
    id: "charm",
    name: "Charm",
    description:
      "Each hit has a 4% chance of charming the enemy for 5 seconds. Charmed units walk up the board and attack enemies.",
    type: "ball",
  },
  {
    id: "dark",
    name: "Dark",
    description:
      "Deals 3.0x damage but destroys itself after hitting an enemy. Has a 3 second cooldown before it can be shot again.",
    type: "ball",
  },
  {
    id: "darkflame",
    name: "Banished Flame",
    description:
      "Adds stacks of darkflame to enemies, damaging over time and upon going out.",
    type: "ball",
  },
  // { id: "drill", name: "Drill", description: "", type: "ball" },
  {
    id: "earthquake",
    name: "Earthquake",
    description: "Deals 5-13 damage to nearby units in a 3x3 tile square.",
    type: "ball",
  },
  {
    id: "egg sac",
    name: "Egg Sac",
    description:
      "Explodes into 2-4 baby balls on hitting an enemy. Has a 3 second cooldown before it can be shot again.",
    type: "ball",
  },
  // { id: "elemental", name: "Elemental", description: "", type: "ball" },
  // { id: "Erosion", name: "Erosion", description: "", type: "ball" },
  // { id: "firefly", name: "Firefly", description: "", type: "ball" },
  {
    id: "fireworks",
    name: "Fireworks",
    description:
      "Explodes into fireworks that target random enemies, dealing damage and applying burn.",
    type: "ball",
  },
  {
    id: "flash",
    name: "Flash",
    description:
      "Damage all enemies on screen for 1-3 damage after hitting an enemy and blind them for 2 seconds.",
    type: "ball",
  },
  // { id: "flesh", name: "Flesh", description: "", type: "ball" },
  // { id: "fleshmound", name: "Fleshmound", description: "", type: "ball" },
  {
    id: "flicker",
    name: "Flicker",
    description: "Deals 1-7 damage to every enemy on screen every 1.4 seconds.",
    type: "ball",
  },
  {
    id: "freeze",
    name: "Freeze",
    description:
      "Has a 4% chance to freeze enemies for 5.0 seconds. Frozen enemies receive 25% more damage.",
    type: "ball",
  },
  {
    id: "freeze ray",
    name: "Freeze Ray",
    description:
      "Emits a freeze ray when hitting an enemy, dealing 20-50 to all enemies in its path, with a 10% chance of freezing them for 10.0 seconds.",
    type: "ball",
  },
  {
    id: "frozen flame",
    name: "Frozen Flame",
    description:
      "Add 1 stack of frostburn on hit for 20 seconds (max 4 stacks). Frostburnt units are dealt 8-12 damage per stack per second and receive 25% more damage from other sources.",
    type: "ball",
  },
  {
    id: "ghost",
    name: "Ghost",
    description: "Passes through enemies.",
    type: "ball",
  },
  {
    id: "glacier",
    name: "Glacier",
    description:
      "Releases glacial spikes over time that deal 15-30 to enemies that touch them and freeze them for 2.0 seconds. This ball and its glacial spikes also deal 6-12 damage to nearby units.",
    type: "ball",
  },
  // { id: "hearteater", name: "Hearteater", description: "", type: "ball" },
  {
    id: "hemorrhage",
    name: "Hemorrhage",
    description:
      "Inflicts 3 stacks of bleed. When hitting an enemy with 12 stacks of bleed or more, consumes all stacks of bleed to deal 20% of their current health.",
    type: "ball",
  },
  {
    id: "holy laser",
    name: "Holy Laser",
    description:
      "Deals 24-36 damage to all enemies in the same row and column.",
    type: "ball",
  },
  {
    id: "incubus",
    name: "Incubus",
    description:
      "Each hit has a 4% chance of charming the enemy for 9 seconds. Charmed enemies curse nearby enemies. Cursed enemies are dealt 100-200 after being hit 5 times.",
    type: "ball",
  },
  {
    id: "inferno",
    name: "Inferno",
    description:
      "Applies 1 stack of burn every second to all enemies within a 2 tile radius. Burn lasts for 6 seconds, dealing 3-7 damage per stack per seconds.",
    type: "ball",
  },
  {
    id: "iron",
    name: "Iron",
    description: "Deals double damage but moves 40% slower.",
    type: "ball",
  },
  {
    id: "landslide",
    name: "Landslide",
    description:
      "Creates a landslide, dealing damage in an area over a 5 second period.",
    type: "ball",
  },
  {
    id: "laser (horizontal)",
    name: "Horizontal Laser",
    description: "Deals 9-18 damage to all enemies in the same row.",
    type: "ball",
  },
  {
    id: "laser (vertical)",
    name: "Vertical Laser",
    description: "Deals 9-18 damage to all enemies in the same column.",
    type: "ball",
  },
  {
    id: "laser beam",
    name: "Laser Beam",
    description:
      "Emit a laser beam on hit that deals 30-42 damage and blinds enemies for 8 seconds.",
    type: "ball",
  },
  {
    id: "lasercutter",
    name: "Laser Cutter",
    description:
      "Constantly emits a laser in front of it, which deals 100-150 damage per second.",
    type: "ball",
  },
  {
    id: "leech",
    name: "Leech",
    description:
      "Attaches up to 1 leech onto enemies it hits, which add 2 stacks of bleed per seconds (max 24 stacks).",
    type: "ball",
  },
  {
    id: "light",
    name: "Light",
    description:
      "Blinds enemies on hit for 3 seconds. Blinded units have a hard time detecting you and have a 50% chance of missing when they attack.",
    type: "ball",
  },
  {
    id: "lightning",
    name: "Lightning",
    description: "Deals 1-20 damage to up to 3 nearby enemies.",
    type: "ball",
  },
  {
    id: "lightning rod",
    name: "Lightning Rod",
    description:
      "Plants a lightning rod into enemies it hits. These enemies are struck by lightning every 3.0 seconds, dealing 1-30 damage to up to 8 nearby enemies.",
    type: "ball",
  },
  {
    id: "lovestruck",
    name: "Lovestruck",
    description:
      "Inflicts lovestruck on hit enemies for 20 seconds. Lovestruck units have a 50% chance of healing you for 5 health when they attack.",
    type: "ball",
  },
  {
    id: "maggot",
    name: "Maggot",
    description:
      "Infest enemies on hit with maggots. When they dies, they explode into 1-2 baby balls.",
    type: "ball",
  },
  {
    id: "magma",
    name: "Magma",
    description:
      "Emits lava blobs over time. Enemies who walk into lava blobs are dealt 15-30 damage and gain 1 stack of burn (max 3 stacks). Burn lasts for 3 seconds, dealing 3-8 damage per stack per second. This ball and its lava blobs also deal 6-12 damage to nearby units.",
    type: "ball",
  },
  {
    id: "mosquito king",
    name: "Mosquito King",
    description:
      "Spawns a mosquito each time it hits an enemy. Mosquitos attack a random enemy, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health.",
    type: "ball",
  },
  {
    id: "mosquito swarm",
    name: "Mosquito Swarm",
    description:
      "Explodes into 3-6 mosquitos. Mosquitos attack random enemies, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health.",
    type: "ball",
  },
  // {
  //   id: "mosquitokingdom",
  //   name: "Mosquito Kingdom",
  //   description: "",
  //   type: "ball",
  // },
  {
    id: "nosferatu",
    name: "Nosferatu",
    description:
      "Spawns a vampire bat each bounce. Vampire bats fly towards a random enemy, dealing 132-176 damage on hit, turning into a Vampire Lord.",
    type: "ball",
  },
  {
    id: "noxious",
    name: "Noxious",
    description:
      "Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second.",
    type: "ball",
  },
  {
    id: "nuclear bomb",
    name: "Nuclear Bomb",
    description:
      "Explodes when hitting an enemy, dealing 300-500 damage to nearby enemies and applying 1 stack of radiation to everyone present indefinitely (max 5 stacks). Each stack of radiation increases damage received by 10%. Has a 3 second cooldown.",
    type: "ball",
  },
  // { id: "offspring", name: "Offspring", description: "", type: "ball" },
  {
    id: "overgrowth",
    name: "Overgrowth",
    description:
      "Applies 1 stack of overgrowth. Upon reaching 3, consume all stacks and deal 150-200 damage to all enemies in a 3x3 tile square",
    type: "ball",
  },
  // { id: "petrify", name: "Petrify", description: "", type: "ball" },
  {
    id: "phantom",
    name: "Phantom",
    description:
      "Curse enemies on hit. Cursed enemies are dealt 100-200 damage after being hit 5 times.",
    type: "ball",
  },
  {
    id: "poison",
    name: "Poison",
    description:
      "\tApplies 1 stack of poison on hit (max 5 stacks). Poison lasts for 6 seconds and each stack deals 1-4 damage per second.",
    type: "ball",
  },
  {
    id: "radiation beam",
    name: "Radiation Beam",
    description:
      "Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack.",
    type: "ball",
  },
  // { id: "reaper", name: "Reaper", description: "", type: "ball" },
  {
    id: "sacrifice",
    name: "Sacrifice",
    description:
      "Inflicts 4 stacks of bleed (max 15 stacks) and applies curse to hit enemies. Cursed enemies are dealt 50-100 after being hit 5 times.",
    type: "ball",
  },
  {
    id: "sandstorm",
    name: "Sandstorm",
    description:
      "Goes through enemies and is surrounded by a raging storm dealing 10-20 damage per second and blinding nearby enemies for 3 seconds.",
    type: "ball",
  },
  {
    id: "satan",
    name: "Satan",
    description:
      "While active, add 1 stack of burn to all active enemies per second (max 5 stacks), dealing 10-20 damage per stack per second and make them go berserk, dealing 15-24 damage to adjacent enemies every second.",
    type: "ball",
  },
  {
    id: "shotgun",
    name: "Shotgun",
    description:
      "Shoots 3-7 iron baby balls after hitting a wall. Iron baby balls move at 200% speed but are destroyed upon hitting anything.",
    type: "ball",
  },
  // { id: "sniper", name: "Sniper", description: "", type: "ball" },
  {
    id: "soul sucker",
    name: "Soul Sucker",
    description:
      "Passes through enemies and saps them, with a 30% chance of stealing 1 health and reducing their attack damage by 20%. Lifesteal chance only applies once per enemy.",
    type: "ball",
  },
  {
    id: "spider queen",
    name: "Spider Queen",
    description:
      "Has a 25% chance of birthing an Egg Sac each time it hits an enemy.",
    type: "ball",
  },
  {
    id: "steel",
    name: "Steel",
    description:
      "Initially deals double damage but moves 50% slower. Damage increases by 10% each time it hits an enemy (max 300%).",
    type: "ball",
  },
  {
    id: "stone",
    name: "Stone",
    description:
      "Initially deals 300% damage. Damage erodes by 40% each time hitting an enemy (minimum 50%).",
    type: "ball",
  },
  {
    id: "storm",
    name: "Storm",
    description:
      "Emits lightning to strike nearby enemies every second, dealing 1-40 damage.",
    type: "ball",
  },
  {
    id: "succubus",
    name: "Succubus",
    description:
      "Each hit has a 4% chance of charming the enemy for 9 seconds. Heals 1 when hitting a charmed enemy.",
    type: "ball",
  },
  {
    id: "sun",
    name: "Sun",
    description:
      "Blind all enemies in view and add 1 stack of burn every second (max 5 stacks). Burn lasts for 6 seconds and deals 6-12 damage per stack per second.",
    type: "ball",
  },
  {
    id: "swamp",
    name: "Swamp",
    description:
      "Leaves behind tar blobs over time. Enemies who walk into tar blobs are dealt 15-30, are slowed by 50% for 7 seconds and gain 1 stack of poison (max 8 stacks). Each stack of poison deals 1-3 damage per second. This ball and its tar blobs also deal 6-12 damage to nearby units.",
    type: "ball",
  },
  // { id: "Time", name: "Time", description: "", type: "ball" },
  // { id: "timebomb", name: "Timebomb", description: "", type: "ball" },
  // { id: "timestop", name: "Timestop", description: "", type: "ball" },
  // { id: "tumor", name: "Tumor", description: "", type: "ball" },
  {
    id: "vampire",
    name: "Vampire",
    description: "Each hit has a 4.5% chance of healing 1 health.",
    type: "ball",
  },
  {
    id: "vampire lord",
    name: "Vampire Lord",
    description:
      "Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed.",
    type: "ball",
  },
  // { id: "venom", name: "Venom", description: "", type: "ball" },
  {
    id: "virus",
    name: "Virus",
    description:
      "Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second.",
    type: "ball",
  },
  {
    id: "voluptuous egg sac",
    name: "Voluptuous Egg Sac",
    description:
      "Explodes into 2-3 egg sacs on hitting an enemy. Has a 3 second cooldown before it can be shot again.",
    type: "ball",
  },
  // { id: "warp", name: "Warp", description: "", type: "ball" },
  {
    id: "wind",
    name: "Wind",
    description:
      "Passes through enemies and slows them down by 30% for 5 seconds, but deals 25% less damage.",
    type: "ball",
  },
  {
    id: "wraith",
    name: "Wraith",
    description: "Freezes any enemy it passes through for 0.8 seconds.",
    type: "ball",
  },
  // { id: "xray", name: "Xray", description: "", type: "ball" },
  // { id: "zombie", name: "Zombie", description: "", type: "ball" },
  {
    id: "archers effigy",
    name: "Archers Effigy",
    description: "",
    type: "passive",
  },
  { id: "arrow", name: "Arrow", description: "", type: "passive" },
  {
    id: "artificial heart",
    name: "Artificial Heart",
    description: "",
    type: "passive",
  },
  { id: "artillery", name: "Artillery", description: "", type: "passive" },
  { id: "baby rattle", name: "Baby Rattle", description: "", type: "passive" },
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
  { id: "breastplate", name: "Breastplate", description: "", type: "passive" },
  { id: "cornucopia", name: "Cornucopia", description: "", type: "passive" },
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
  { id: "detonator", name: "Detonator", description: "", type: "passive" },
  {
    id: "diamond hilted dagger",
    name: "Diamond Hilted Dagger",
    description: "",
    type: "passive",
  },
  { id: "dumbbell", name: "Dumbbell", description: "", type: "passive" },
  { id: "dynamite", name: "Dynamite", description: "", type: "passive" },
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
  { id: "fleet feet", name: "Fleet Feet", description: "", type: "passive" },
  {
    id: "frozen spike",
    name: "Frozen Spike",
    description: "",
    type: "passive",
  },
  { id: "gemspring", name: "Gemspring", description: "", type: "passive" },
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
  { id: "golden bull", name: "Golden Bull", description: "", type: "passive" },
  {
    id: "gracious impaler",
    name: "Gracious Impaler",
    description: "",
    type: "passive",
  },
  { id: "hammer", name: "Hammer", description: "", type: "passive" },
  { id: "hand fan", name: "Hand Fan", description: "", type: "passive" },
  { id: "hand mirror", name: "Hand Mirror", description: "", type: "passive" },
  {
    id: "healers effigy",
    name: "Healers Effigy",
    description: "",
    type: "passive",
  },
  { id: "hourglass", name: "Hourglass", description: "", type: "passive" },
  { id: "impaler", name: "Impaler", description: "", type: "passive" },
  { id: "irononesie", name: "Irononesie", description: "", type: "passive" },
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
  { id: "magic staff", name: "Magic Staff", description: "", type: "passive" },
  { id: "magnet", name: "Magnet", description: "", type: "passive" },
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
  { id: "rapier", name: "Rapier", description: "", type: "passive" },
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
  { id: "shortbow", name: "Shortbow", description: "", type: "passive" },
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
  { id: "slingshot", name: "Slingshot", description: "", type: "passive" },
  { id: "soul reaver", name: "Soul Reaver", description: "", type: "passive" },
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
  { id: "stopwatch", name: "Stopwatch", description: "", type: "passive" },
  {
    id: "swordbreaker",
    name: "Swordbreaker",
    description: "",
    type: "passive",
  },
  { id: "tire", name: "Tire", description: "", type: "passive" },
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
  { id: "turret", name: "Turret", description: "", type: "passive" },
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
  { id: "voodoo doll", name: "Voodoo Doll", description: "", type: "passive" },
  { id: "wagon wheel", name: "Wagon Wheel", description: "", type: "passive" },
  { id: "war horn", name: "War Horn", description: "", type: "passive" },
  { id: "windweaver", name: "Windweaver", description: "", type: "passive" },
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
]);

console.log(
  JSON.stringify(
    itemData.sort(
      (a, b) => a.type.localeCompare(b.type) || a.id.localeCompare(b.id),
    ),
  ),
);

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
