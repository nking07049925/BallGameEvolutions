import type { SheetImage, SpriteRegion } from "./SpriteSheetSchema";

export type ItemId = string;

export type RawItem = {
  id: ItemId;
  name: string;
  description: string;
  dependencies?: ItemId[];
};

export type RawEvolution = {
  items: ItemId[];
  result: ItemId;
};

export type ItemSchema = {
  items: RawItem[];
  evolutions: RawEvolution;
};

export type Item =
  | RawItem
  | (RawItem & {
      spriteRegion: SpriteRegion;
      spriteImage: SheetImage;
      spriteImageUrl: string;
    });
