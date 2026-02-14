import { ItemIcon } from "./ItemIcon";
import type { Item } from "../data/Items";
import "./ItemEvoTree.css";

export type ItemEvoTreeProps = {
  items: Item[];
  minimumIngredientCount?: number;
  minimumDepth?: number;
};
/** Represents a single way to assemble an item */
type EvolutionPath = {
  node: Item;
  ingredients?: EvolutionPath[];
  depth: number;
  maxDepth: number;
  span: number;
  offset: number;
};

const buildEvolutionPath = (node: Item, depth: number): EvolutionPath[] => {
  const current: EvolutionPath = {
    node,
    depth,
    span: 1,
    offset: 0,
    maxDepth: 0,
  };
  const evolutions = node.evolvesFrom;
  if (!evolutions.length) return [current];
  return evolutions.flatMap((evolution) =>
    // calc all varations for all child recipes in case the devs decide to have
    // multistage evos with multiple paths

    evolution.items // figure out all possible ways to make every child
      .map((child) => buildEvolutionPath(child, depth + 1))
      .reduce(
        // expand the child varations
        (trees: EvolutionPath[][], childs) =>
          childs.flatMap((childTree) =>
            trees.map((trees) => [...trees, childTree]),
          ),
        [[]],
      )
      .map((trees) => ({
        ...current,
        ingredients: trees,
        span: trees.reduce((total, { span }) => total + span, 0),
        maxDepth: trees.reduce(
          (total, { maxDepth }) => Math.max(total, maxDepth + 1),
          0,
        ),
        depth,
      })),
  );
};

const calcOffsets = (path: EvolutionPath, offset: number) => {
  path.offset = offset;
  path.ingredients?.forEach((item) => {
    calcOffsets(item, offset);
    offset += item.span;
  });
};

const flattenPaths = (path: EvolutionPath, res: EvolutionPath[][]) => {
  (res[path.depth] ??= []).push(path);
  path.ingredients?.forEach((item) => flattenPaths(item, res));
  return res;
};

const PathTree = ({ path }: { path: EvolutionPath }) => {
  const flattened = flattenPaths(path, []);
  return (
    <table style="height: fit-content">
      <thead>
        <tr>
          <th class="item-text" colSpan={path.span}>
            {path.node.name}
          </th>
        </tr>
      </thead>
      <tbody>
        {flattened.map((row) => (
          <tr>
            {row.map((col, ind) => {
              const previous = row[ind - 1];
              const spanDiff =
                col.offset - (previous ? previous.offset + previous.span : 0);
              return (
                <>
                  {!!spanDiff && <td colSpan={spanDiff} class="empty"></td>}
                  <td colSpan={col.span}>
                    <div class="item-icon-cell">
                      <ItemIcon
                        item={col.node}
                        size={32 + 16 * col.maxDepth}
                        showPopover
                      />
                    </div>
                  </td>
                </>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const buildAllPaths = ({
  items,
  minimumDepth,
  minimumIngredientCount,
}: ItemEvoTreeProps) => {
  const ingredients = new Set(
    items.flatMap(({ evolvesFrom }) =>
      evolvesFrom.flatMap(({ items }) => items),
    ),
  );
  const evolutionPaths = items
    .flatMap((item) => buildEvolutionPath(item, 0))
    .filter(
      (path) =>
        !ingredients.has(path.node) &&
        (path.maxDepth >= (minimumDepth ?? 1) ||
          (minimumIngredientCount &&
            path.ingredients &&
            path.ingredients.length >= minimumIngredientCount)),
    );
  evolutionPaths.forEach((path) => calcOffsets(path, 0));
  evolutionPaths.sort(
    (a, b) =>
      b.maxDepth - a.maxDepth ||
      (b.ingredients?.length ?? 0) - (a.ingredients?.length ?? 0) ||
      a.node.name.localeCompare(b.node.name),
  );
  return evolutionPaths;
};

export const ItemEvoTree = (props: ItemEvoTreeProps) => (
  <div class="item-evo-tree">
    {buildAllPaths(props).map((path) => (
      <PathTree path={path} />
    ))}
  </div>
);
