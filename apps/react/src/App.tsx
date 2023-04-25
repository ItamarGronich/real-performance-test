import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createList, token } from "./utils/list";
import { measureCallsPerSecond } from "./utils/logging";

function ListItem({ name }: { name: string }) {
  return <li>{name}</li>;
}

let intervals: number[] | null = null;

function App() {
  const [list, setList] = useState(createList());

  useEffect(() => {
    intervals =
      intervals ||
      list.map((item) =>
        setInterval(() => {
          measureCallsPerSecond("Interval");
          setList((list) => {
            measureCallsPerSecond("setListUnbuffered");
            return list.map((li) => {
              measureCallsPerSecond("listItemIteration");
              return item.id === li.id ? { id: li.id, name: token() } : li;
            });
          });
        }, 10)
      );

    return () => {
      intervals?.forEach((interval) => clearInterval(interval));
      intervals = null;
    };
  }, []);

  return (
    <>
      <div>
        <div className="logo">
          <img src={reactLogo} className="logo react" alt="React logo" />
          React
        </div>
        <ul>
          {list.map((item) => (
            <ListItem name={item.name} key={item.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
