import { createElement, render, useStates, mounted } from "./modules/reactlike";

/** @jsx createElement */
function App() {
  const [count, setCount] = useStates(0);

  mounted(() => {
    document
      .querySelector(".timer")
      .addEventListener("click", () => setCount((value) => value + 1));
  });

  return (
    <h1>
      <p class="timer">
        Timer <i>{count}</i>
      </p>
    </h1>
  );
}

const element = <App />;
const container = document.getElementById("root");
render(element, container);
