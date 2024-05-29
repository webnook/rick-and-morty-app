import { HeartIcon } from "@heroicons/react/24/outline";
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
export const Favorites = ({ numOfFavorites }) => {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFavorites}</span>
    </button>
  );
};

export default Navbar;
