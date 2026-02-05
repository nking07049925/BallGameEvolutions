export type SpriteRegion = {
  x: number;
  y: number;
  w: number;
  h: number;
};
export type Sprite = {
  id: string;
  region: SpriteRegion;
};

export type SheetImage = {
  location: string;
  width: number;
  height: number;
};

export type SpriteSheet = {
  image: SheetImage;
  sprites: Sprite[];
};

export type SpriteSheetSchema = {
  sheets: SpriteSheet[];
};
