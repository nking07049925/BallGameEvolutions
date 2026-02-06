import "./App.css";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoTree } from "./components/ItemEvoTree";
import { balls, itemsDict, passives, type ItemId } from "./data/Items";
import { evolutions, ballEvolutions, passiveEvolutions } from "./data/Items";
import { ItemEvoListGrouped } from "./components/ItemEvoListGrouped";
import { ItemIcon } from "./components/ItemIcon";
import { For, type JSX } from "solid-js";
import { A, HashRouter, useParams } from "@solidjs/router";
import { ItemCard } from "./components/ItemCard";

type Route = {
  path: string;
  title: JSX.Element;
  component: () => JSX.Element;
  end?: boolean;
  showInNav?: boolean;
};

const routes: Route[] = [
  {
    path: "/itemlist",
    title: "All items",
    showInNav: true,
    component: () => (
      <>
        <h2>Balls</h2>
        <ItemList items={balls} />
        <h2>Passives</h2>
        <ItemList items={passives} />
      </>
    ),
  },
  {
    path: "/",
    end: true,
    showInNav: true,
    title: "Ball Evolutions",
    component: () => (
      <ItemEvoListGrouped evolutions={evolutions} items={balls} />
    ),
  },
  {
    path: "/evotable",
    title: "Ball Evolution Table",
    showInNav: true,
    component: () => (
      <div style="overflow: auto; width: min-content; max-width: 80vw; max-height: 80vh">
        <ItemEvoTable items={balls} evolutions={evolutions} />
      </div>
    ),
  },
  {
    path: "/evotree",
    title: "Evolution Tree",
    showInNav: true,
    component: () => (
      <>
        <h2>Balls</h2>
        <ItemEvoTree
          evolutions={ballEvolutions}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
        <h2>Passives</h2>
        <ItemEvoTree
          evolutions={passiveEvolutions}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
      </>
    ),
  },
  {
    path: "/items/:id",
    title: "Item Info",
    component: () => {
      const params = useParams<{ id: string }>();
      return (
        <div style="width: min-content; min-width: 250px">
          <ItemCard item={itemsDict.get(decodeURI(params.id) as ItemId)} />
        </div>
      );
    },
  },
];

const randomBall = balls[Math.floor(Math.random() * balls.length)];

const Layout = (props: { children?: JSX.Element }) => (
  <>
    <header class="title">
      <h1 style="display: flex; gap: 16px">
        <ItemIcon item={randomBall} size={64} />
        Ball x Pit Evolution Explorer
      </h1>
    </header>
    <nav class="nav">
      <For each={routes.filter((route) => route.showInNav)}>
        {(route) => (
          <A
            class="route"
            activeClass="route-active"
            href={route.path}
            end={route.end}
          >
            {route.title}
          </A>
        )}
      </For>
    </nav>

    <div class="body">{props.children}</div>

    <footer>
      this is made for fun by a fan, i dont own anything from the game,
      everything belongs to devolver/kenny sun and friends, yadda yadda
      <br />
      <br />
      some of the visuals inspired by evolution charts by Sora-MMK and
      Mr_01101101
    </footer>
  </>
);

const App = () => (
  <HashRouter root={Layout} base={import.meta.env.BASE_URL}>
    {routes}
  </HashRouter>
);
export default App;
