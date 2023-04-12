import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesRemove,
  fetchHeroes,
  filteredHeroesSelector,
} from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useCallback } from "react";

import { AnimatePresence } from "framer-motion";

const HeroesList = () => {
  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);
  const onRemoveItem = useCallback(
    (itemId) => {
      request(`http://localhost:3001/heroes/${itemId}`, "DELETE")
        .then(dispatch(heroesRemove(itemId)))
        .catch(console.log("error"));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem
          onRemoveItem={() => onRemoveItem(id)}
          id={id}
          key={id}
          {...props}
        />
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return (
    <ul>
      <AnimatePresence>{elements}</AnimatePresence>
    </ul>
  );
};

export default HeroesList;
