import { useMemo } from "react";
import { useSelector } from "react-redux";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";
const HeroesList = () => {
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const filteredHeroes = useMemo(() => {
    const filteredHeroes = heroes.slice();
    return activeFilter === "all"
      ? filteredHeroes
      : filteredHeroes.filter((item) => item.element === activeFilter);
  }, [activeFilter, heroes]);

  const onRemoveItem = useCallback(
    (itemId) => {
      deleteHero(itemId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
