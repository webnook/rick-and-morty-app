// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites } from "./components/Navbar";
import { Search } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setCharacters([]);
      return;
    }
    getData();
    return () => controller.abort();
  }, [query]);

  const selectCharacterHandler = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const addFavoriteHandler = (character) => {
    setFavorites((prevFav) => [...prevFav, character]);
  };
  const isAddedToFavorites = favorites
    .map((fav) => fav.id)
    .includes(selectedId);

  const deleteFavoriteHandler = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
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
        <Favorites
          favorites={favorites}
          OnDeleteFavorite={deleteFavoriteHandler}
        />
      </Navbar>
      <div className="main">
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={selectCharacterHandler}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={addFavoriteHandler}
          isAddedToFavorites={isAddedToFavorites}
        />
      </div>
    </div>
  );
};
export default App;
