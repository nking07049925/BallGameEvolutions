import "./App.css";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoTree } from "./components/ItemEvoTree";
import { balls, passives } from "./data/Items";
import {
  evolutions,
  ballEvolutions,
  passiveEvolutions,
} from "./data/Evolutions";
import { ItemEvoListGrouped } from "./components/ItemEvoListGrouped";
import { ItemIcon } from "./components/ItemIcon";
import { For, type JSX } from "solid-js";
import { A, Router } from "@solidjs/router";

type Route = {
  path: string;
  title: JSX.Element;
  component: () => JSX.Element;
  end?: boolean;
};

const routes: Route[] = [
  {
    path: "/",
    end: true,
    title: "Ball Evolutions",
    component: () => (
      <ItemEvoListGrouped evolutions={evolutions} items={balls} />
    ),
  },
  {
    path: "/itemlist",
    title: "All items",
    component: () => (
      <>
        <h3>Balls</h3>
        <ItemList items={balls} />
        <h3>Passives</h3>
        <ItemList items={passives} />
      </>
    ),
  },
  {
    path: "/evotable",
    title: "Ball Evolution Table",
    component: () => <ItemEvoTable items={balls} evolutions={evolutions} />,
  },
  {
    path: "/evotree",
    title: "Ball Evolution Tree",
    component: () => (
      <>
        <h3>Balls</h3>
        <ItemEvoTree
          evolutions={ballEvolutions}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
        <h3>Passives</h3>
        <ItemEvoTree
          evolutions={passiveEvolutions}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
      </>
    ),
  },
].map((route) => ({
  ...route,
  component: () => (
    <>
      <h2>{route.title}</h2>
      {route.component()}
    </>
  ),
}));

const Layout = (props: { children?: JSX.Element }) => (
  <>
    <header class="title">
      <h1 style="display: flex; gap: 16px">
        <ItemIcon
          item={balls[Math.floor(Math.random() * balls.length)]}
          size={64}
        />
        Ball x Pit Evolution Explorer
      </h1>
      <nav style="display: flex; gap: 16px">
        <For each={routes}>
          {(route) => (
            <A class="route" href={route.path} end={route.end}>
              {route.title}
            </A>
          )}
        </For>
      </nav>
    </header>

    <div class="body">{props.children}</div>

    <footer>
      this is made for fun by a fan, i dont own anything from the game,
      everything belongs to devolver/kenny sun and friends, yadda yadda
      <br />
      some of the visuals inspired by evolution charts by Sora-MMK and
      Mr_01101101
    </footer>
  </>
);

const App = () => <Router root={Layout}>{routes}</Router>;
export default App;
