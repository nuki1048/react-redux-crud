import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesRemove,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useCallback } from "react";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes/")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

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

  const filteredData = (arr, filter) => {
    if (!filter || filter === "all") return arr;
    return arr.filter((item) => item.element === filter);
  };
  const filterData = filteredData(heroes, activeFilter);
  const elements = renderHeroesList(filterData);
  return <ul>{elements}</ul>;
};

export default HeroesList;
