import { createElement, render } from "./modules/reactlike";
import App from "./components/App";

/** @jsx createElement */
const element = <App />;
const container = document.getElementById("root");
render(element, container);
