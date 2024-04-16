// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoading(true);
        const data = await fetch("https://rickandmortyapi.com/api/character");
        const { results } = await data.json();
        setCharacters(results.slice(0, 5));
        setIsLoading(false);
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
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
};
export default App;
