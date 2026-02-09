/* @refresh reload */
import { render } from "preact";
import "./index.css";
import { App } from "./App.tsx";

const root = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(<App />, root!);
