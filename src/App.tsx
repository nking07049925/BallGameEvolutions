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

function App() {
  return (
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

      <div class="body">
        <h2>All items</h2>
        <h3>Balls</h3>
        <ItemList items={balls} />
        <h3>Passives</h3>
        <ItemList items={passives} />

        <h2>Evolution list</h2>
        <ItemEvoListGrouped evolutions={evolutions} items={balls} />

        <h2>Evolution table</h2>
        <ItemEvoTable items={balls} evolutions={evolutions} />

        <h2>Evolution tree</h2>
        <h3>Balls</h3>
        <ItemEvoTree
          evolutions={ballEvolutions}
          minimumDepth={2}
          minimumIngredientCount={3}
        />
        <h3>Passives</h3>
        <ItemEvoTree
          evolutions={passiveEvolutions}
          minimumDepth={1}
          minimumIngredientCount={2}
        />
      </div>

      <footer>
        this is made for fun by a fan, i dont own anything from the game,
        everything belongs to devolver/kenny sun and friends, yadda yadda
        <br />
        some of the visuals inspired by evolution charts by Sora-MMK and
        Mr_01101101
      </footer>
    </>
  );
}

export default App;
