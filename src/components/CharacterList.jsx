import { EyeIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
const CharacterList = ({ characters, isLoading }) => {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CharacterList;
const Character = ({ item }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
};
const CharacterName = ({ item }) => {
  return (
    <h3 className="name">
      <span> {item.gender === "Male" ? "👱🏻‍♂️" : "👱🏻‍♀️"}</span>
      <span>&nbsp;{item.name}</span>
    </h3>
  );
};
const CharacterInfo = ({ item }) => {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>&nbsp;{item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
};
