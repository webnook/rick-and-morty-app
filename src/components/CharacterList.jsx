import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import { DNA } from "react-loader-spinner";
const CharacterList = ({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) => {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loader>
          <DNA height="120" width="120" />
        </Loader>
      </div>
    );
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
         >
          <button
            className="icon red"
            onClick={() => onSelectCharacter(item.id)}>
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
};

export default CharacterList;
export const Character = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      {children}
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
