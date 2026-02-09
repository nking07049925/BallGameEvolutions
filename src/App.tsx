import "./App.css";
import { ItemEvoTable } from "./components/ItemEvoTable";
import { ItemList } from "./components/ItemList";
import { ItemEvoTree } from "./components/ItemEvoTree";
import { balls, itemsDict, passives, type ItemId } from "./data/Items";
import { ItemEvoListGrouped } from "./components/ItemEvoListGrouped";
import { ItemIcon } from "./components/ItemIcon";
import { ItemInfo } from "./pages/ItemInfo";
import type { ComponentChildren } from "preact";
import { Link, Route, Router, Switch, useParams } from "wouter-preact";
import { useHashLocation } from "wouter-preact/use-hash-location";
import { dictify, filterTruthy, joinClassNames } from "./util/Data";

type Route<Paths extends string> = {
  path: Paths;
  title: ComponentChildren;
  component: (params?: object) => ComponentChildren;
  showInNav?: boolean;
};

const typedRoutes = <Paths extends string>(routes: Route<Paths>[]) => routes;

const routes = typedRoutes([
  {
    path: "/itemlist",
    title: "All items",
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
    path: "/evotable",
    title: "Ball Evolution Table",
    component: () => (
      <div style="overflow: auto; width: min-content; max-width: 80vw; max-height: 80vh">
        <ItemEvoTable items={balls} />
      </div>
    ),
  },
  {
    path: "/evotree",
    title: "Evolution Tree",
    component: () => (
      <>
        <h2>Balls</h2>
        <ItemEvoTree
          items={balls}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
        <h2>Passives</h2>
        <ItemEvoTree
          items={passives}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
      </>
    ),
  },
  {
    path: "/items/:itemId",
    title: "Item Info",
    component: () => {
      const { itemId } = useParams<{ itemId: ItemId }>();
      return <ItemInfo item={itemsDict.get(itemId)} />;
    },
  },
  {
    path: "/",
    title: "Ball Evolutions",
    component: () => <ItemEvoListGrouped items={balls} />,
  },
]);

const routeDict = dictify(routes, (route) => route.path);
const links: (typeof routes)[number]["path"][] = [
  "/itemlist",
  "/",
  "/evotable",
  "/evotree",
];
const routesForNav = links
  .map((link) => routeDict.get(link))
  .filter(filterTruthy);

const randomBall = balls[Math.floor(Math.random() * balls.length)];

export const App = () => (
  <Router hook={useHashLocation}>
    <div class="title-container">
      <header class="title">
        <div style="display: flex; gap: 16px">
          <ItemIcon item={randomBall} size={64} showPopover />
          <h1>Ball x Pit Evolution Explorer</h1>
        </div>
        <nav class="nav">
          {routesForNav.map((route) => (
            <Link
              className={(active) =>
                joinClassNames("route", active && "route-active")
              }
              href={route.path}
            >
              {route.title}
            </Link>
          ))}
        </nav>
      </header>
    </div>

    <div class="body-container">
      <div class="body">
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} />
          ))}
          <Route>
            <h2>404, Sorry the page does not exist!</h2>
          </Route>
        </Switch>
      </div>
    </div>

    <footer>
      <div class="footer-text">
        this is made for fun by a fan, i dont own anything from the game,
        everything belongs to devolver/kenny sun and friends, yadda yadda
        <br />
        <br />
        some of the visuals inspired by evolution charts by Sora-MMK and
        Mr_01101101
      </div>
    </footer>
  </Router>
);
