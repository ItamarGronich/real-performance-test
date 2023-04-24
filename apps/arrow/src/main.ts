import "./style.css";
import { html, reactive } from "@arrow-js/core";
import { createList, token } from "./utils/list";
import logo from "../public/logo-arrow.png";

const el = document.querySelector("#app") as Element | undefined;

const list = createList();

const data = reactive({
  list,
});

html`
  <header><img src="${logo}" alt="" height="50" /></header>
  <ul>
    ${data.list.map((item) => html`<li>${() => item.name}</li>`)}
  </ul>
`(el);

setInterval(() => {
  data.list.forEach((item) => {
    item.name = token();
  });
}, 10);
