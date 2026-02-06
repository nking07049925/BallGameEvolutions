import "./App.css";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoTree } from "./components/ItemEvoTree";
import { balls, itemsDict, passives, type ItemId } from "./data/Items";
import { evolutions, ballEvolutions, passiveEvolutions } from "./data/Items";
import { ItemEvoListGrouped } from "./components/ItemEvoListGrouped";
import { ItemIcon } from "./components/ItemIcon";
import { For, type JSX } from "solid-js";
import { A, Router, useParams } from "@solidjs/router";
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
    path: "/",
    end: true,
    showInNav: true,
    title: "Ball Evolutions",
    component: () => (
      <ItemEvoListGrouped evolutions={evolutions} items={balls} />
    ),
  },
  {
    path: "/itemlist",
    title: "All items",
    showInNav: true,
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
    showInNav: true,
    component: () => <ItemEvoTable items={balls} evolutions={evolutions} />,
  },
  {
    path: "/evotree",
    title: "Ball Evolution Tree",
    showInNav: true,
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
  {
    path: "/items/:id",
    title: "Item Info",
    component: () => {
      const params = useParams<{ id: string }>();
      return (
        <div style="width: 250px">
          <ItemCard item={itemsDict.get(decodeURI(params.id) as ItemId)} />
        </div>
      );
    },
  },
];

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
      some of the visuals inspired by evolution charts by Sora-MMK and
      Mr_01101101
    </footer>
  </>
);

const App = () => <Router root={Layout}>{routes}</Router>;
export default App;
