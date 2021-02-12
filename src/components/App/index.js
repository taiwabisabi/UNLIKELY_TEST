import { createElement } from "../../modules/reactlike";
import styles from "./styles.module.scss";

import Slider from "../Slider";

/** @jsx createElement */
export default function App() {
  return (
    <main class={styles.main}>
      <header class={styles.header}>
        <h1 class={styles.title}>Unlikely</h1>
      </header>
      <Slider></Slider>
    </main>
  );
}
