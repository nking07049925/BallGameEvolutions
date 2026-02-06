const [, , basePath = ""] = process.argv;

import { readdirSync, readFileSync, writeFileSync } from "fs";
// const textures = fs.readdirSync(`${basePath}/Assets/Texture2D`);
const spriteFiles = readdirSync(`${basePath}/Assets/Sprite`);
// const spriteAtlases = readdirSync(`${basePath}/Assets/SpriteAtlas`);
// const mainAtlasName = "EquipmentPortraitAtlas.json";

// node scripts/assetParser.js .../Downloads/BallXPitAssets

const atlases = [
  {
    type: "ball",
    pattern: /ball_icon_(.+)\.json/,
    texture: "T_Equipment_Icon_Atlas.png",
    width: 512,
    height: 512,
  },
  {
    type: "ball",
    pattern: /postlaunch_balls_(.+)\.json/,
    texture: "postlaunch_balls.png",
    width: 300,
    height: 250,
  },
  {
    type: "passives",
    pattern: /passive_icon_(.+)\.json/,
    texture: "T_Equipment_Icon_Atlas.png",
    width: 512,
    height: 512,
  },
  {
    type: "passives",
    pattern: /passive_(?!icon_)(.+)\.json/,
    texture: "DLC_passive_sheet.png",
    width: 150,
    height: 50,
  },
];

const sheets = atlases.map(({ name, pattern, texture, width, height }) => {
  const files = spriteFiles.filter((file) => pattern.test(file));
  const rawData = files.map((ballName) => ({
    name: ballName,
    data: JSON.parse(
      readFileSync(`${basePath}/Assets/Sprite/${ballName}`, "utf-8"),
    ),
  }));
  const mappedData = rawData.map(
    ({
      name,
      data: {
        m_Rect: { m_Height: h, m_Width: w, m_X: x, m_Y: y },
      },
    }) => ({
      id: name.match(pattern)[1],
      region: { x, y, h, w },
    }),
  );
  return {
    image: { location: texture, width, height },
    sprites: mappedData,
  };
});

writeFileSync(`data.json`, JSON.stringify({ sheets }), "utf-8");
