//@ts-check

import * as fs from "fs";

/** @type {import("../src/types/SpriteSheetSchema").SpriteSheetSchema}*/
const schema = JSON.parse(
  fs.readFileSync("./src/assets/schema/sheetSchema.json", "utf-8"),
);

const upperFirst = (/**@type{string}*/ str) =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

const mapped = schema.sheets.flatMap((sheet) =>
  sheet.sprites.map(
    (sprite) =>
      /** @type {import("../src/types/ItemSchema").RawItem}*/ ({
        id: sprite.id,
        name: sprite.id.split(" ").map(upperFirst).join(" "),
        description: "",
        type: sheet.type,
      }),
  ),
);

fs.writeFileSync("items.json", JSON.stringify(mapped), "utf-8");
