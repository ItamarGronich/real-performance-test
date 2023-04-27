import reactLogo from "./assets/react.svg";
import "./App.css";
import { useCoins } from "./data/coins/coins";

function App() {
  const { coins } = useCoins();

  return (
    <>
      <div>
        <div className="logo">
          <img src={reactLogo} className="logo react" alt="React logo" />
          React
        </div>
        <ul>
          {coins.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
