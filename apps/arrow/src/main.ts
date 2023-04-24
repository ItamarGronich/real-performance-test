import "./style.css";
import { html, reactive } from "@arrow-js/core";
import { createList, token } from "./utils/list";
import logo from "../public/logo-arrow.png";

const el = document.querySelector("#app") as Element | undefined;

const list = createList();

/* Here, in contrast to vue, Arrow would create a recursive proxy data tree.
   like so:
   data [Proxy]
     - list [Proxy]
      - (0) { id: 0, name: 'sdfsdf' } [Proxy]
      - (1) { id: 1, name: 'abcdef' } [Proxy] 
  Therefore, updating anything, even by reference works.

  This is different than in Vue where vue only creates a proxy for the root item.
  So updating child items doesn't work.
  Vue is not desined to work with nested recusive proxies like this.
  it's designed to work with one root Proxy for a single data structure.
  Doing that would trigger insane amounts of change events for vue to handle.
  While in arrow, they are probably buffered somehow.
  
*/
const data = reactive({
  list,
});

html`
  <header><img src="${logo}" alt="" height="50" /></header>
  <ul>
    ${data.list.map((item) => html`<li>${() => item.name}</li>`)}
  </ul>
`(el);

// I've updated this to be less weird.
// why was there a recursive loop of setTimeouts??
setInterval(() => {
  data.list.forEach((item) => {
    // item here is infact a Proxy. so updating it works.
    item.name = token();
  });
}, 10);
