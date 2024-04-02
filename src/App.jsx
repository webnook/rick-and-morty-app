import { allCharacters } from "../data/data";
import { useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

const App = () => {
  const [characters, setCharacters] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar numOfResult={characters.length} />
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
};
export default App;
