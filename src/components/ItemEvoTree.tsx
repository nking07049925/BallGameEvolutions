import { For, Show } from "solid-js";
import { ItemIcon } from "./ItemIcon";
import { ArrayDict, groupBy } from "../util/Data";
import type { Item, Evolution } from "../data/Items";
import "./ItemEvoTree.css";

export type ItemEvoTreeProps = {
  evolutions: Evolution[];
  minimumIngredientCount?: number;
  minimumDepth?: number;
};
type EvolutionPath = {
  node: Item;
  ingredients?: EvolutionPath[];
  depth: number;
  maxDepth: number;
  span: number;
  offset: number;
};

// every EvolutionPath represents a single way to assemble an item
const buildEvolutionPath = (
  node: Item,
  map: ArrayDict<Item, Evolution>,
  depth: number,
): EvolutionPath[] => {
  const current: EvolutionPath = {
    node,
    depth,
    span: 1,
    offset: 0,
    maxDepth: 0,
  };
  const evolutions = map.get(node);
  if (!evolutions) return [current];
  return evolutions.flatMap((evolution) =>
    // calc the outer product for all child recipes in case they decide to have
    // multistage evos with multiple paths

    evolution.items // figure out all possible ways to make every child
      .map((child) => buildEvolutionPath(child, map, depth + 1))
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
        <For each={flattened}>
          {(row) => (
            <tr>
              <For each={row}>
                {(col, ind) => {
                  const previous = row[ind() - 1];
                  const spanDiff =
                    col.offset -
                    (previous ? previous.offset + previous.span : 0);
                  return (
                    <>
                      <Show when={!!spanDiff}>
                        <td colSpan={spanDiff} class="empty"></td>
                      </Show>
                      <td colSpan={col.span}>
                        <div class="item-icon-cell">
                          <ItemIcon
                            item={col.node}
                            size={32 + 16 * col.maxDepth}
                          />
                        </div>
                      </td>
                    </>
                  );
                }}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export const ItemEvoTree = ({
  evolutions,
  minimumDepth,
  minimumIngredientCount,
}: ItemEvoTreeProps) => {
  const ingredients = new Set(evolutions.flatMap(({ items }) => items));
  const resultMap = groupBy(evolutions, (evo) => evo.result);
  const evolutionPaths = [...resultMap.keys()]
    .flatMap((item) => buildEvolutionPath(item, resultMap, 0))
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
      (b.ingredients?.length ?? 0) - (a.ingredients?.length ?? 0),
  );
  return (
    <div
      class="item-evo-tree"
      style="display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap"
    >
      <For each={evolutionPaths}>{(path) => <PathTree path={path} />}</For>
    </div>
  );
};
