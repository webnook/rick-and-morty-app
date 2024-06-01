// import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
import useCharacter from "./hooks/useCharacter";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites } from "./components/Navbar";
import { Search } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter(
    "https://rickandmortyapi.com/api/character?name",
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorites));
  }, [favorites]);

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
