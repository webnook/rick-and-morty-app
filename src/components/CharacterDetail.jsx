import { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { InfinitySpin } from "react-loader-spinner";
const CharacterDetail = ({ selectedId, onAddFavorite, isAddedToFavorites }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat());
      } catch (error) {
        setCharacter(null);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          height: "16.5rem",
        }}>
        <Loader>
          <InfinitySpin color="red" />
        </Loader>
      </div>
    );

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)", fontSize: "1.5rem" }}>
        please select a character!
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        onAddFavorite={onAddFavorite}
        isAddedToFavorites={isAddedToFavorites}
      />
      <EpisodesList episodes={episodes} />
    </div>
  );
};

export default CharacterDetail;

const CharacterSubInfo = ({ character, onAddFavorite, isAddedToFavorites }) => {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👱🏻‍♀️"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${
              character.status === "Dead" ? "red" : ""
            }`}></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last Known Location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddedToFavorites ? (
            <p style={{ color: "white" }} className="btn btn--primary">
              Already Added ✅
            </p>
          ) : (
            <button
              onClick={() => onAddFavorite(character)}
              className="btn btn--primary">
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodesList = ({ episodes }) => {
  const [sortBy, setSortby] = useState(true);
  let sortedEpisode;
  if (sortBy) {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={() => setSortby((is) => !is)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{
              rotate: sortBy ? "" : "180deg",
              transition: "all .3s ease-in",
            }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :&nbsp;
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
