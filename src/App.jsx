// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { Search } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setCharacters([]);
      return;
    }
    getData();
  }, [query]);

  const onSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search
          numOfResult={characters.length}
          query={query}
          setQuery={setQuery}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={onSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail selectedId={selectedId} />
      </div>
    </div>
  );
};
export default App;
