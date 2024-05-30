import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
const Navbar = ({ numOfResult, children }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">🐱‍👤</div>
      {children}
    </nav>
  );
};
export const Search = ({ numOfResult, query, setQuery }) => {
  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-field"
        type="text"
        placeholder="search..."
      />
      <div className="navbar__result">Found {numOfResult} items</div>
    </>
  );
};
export const Favorites = ({ favorites, OnDeleteFavorite }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List of Favorites">
        {favorites.map((item) => (
          <Character key={item.id} item={item}>
            <button
              className="icon red"
              onClick={() => OnDeleteFavorite(item.id)}>
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
};

export default Navbar;
