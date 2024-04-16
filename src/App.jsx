// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await fetch("https://rickandmortyapi.com/api/character");
        const {results} = await data.json();
        setCharacters(results.slice(0, 5));
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
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
