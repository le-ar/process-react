import React from "react";
import { useShops } from "./hooks";
import Shops from "./Shops/Shops";
import { WeekNamesFull } from "./utils";
import WeekDay from "./WeekDay/WeekDay";

function App() {
  const shops = useShops();

  return (
    <div className="App">
      <Shops shops={shops} />
      {WeekNamesFull.map((name, i) => (
        <WeekDay key={name} day={i} shops={shops} />
      ))}
    </div>
  );
}

export default App;
