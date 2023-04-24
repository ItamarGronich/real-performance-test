import { Component, createSignal } from "solid-js";
import { createList } from "./utils/list";
import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  const [list, setList] = createSignal(createList());

  setInterval(() => {
    setList(createList());
  }, 10);
  return (
    <div>
      <header class={styles.header}>
        <img src={logo} alt="" height="50" /> - Solid
      </header>
      <ul class={styles.App}>
        {list().map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
