import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">🐱‍👤</div>
      <input className="text-field" type="text" placeholder="search..." />
      <div className="navbar__result">Found X items</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">3</span>
      </button>
    </nav>
  );
};

export default Navbar;
