import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { heroesSetFilter, fetchFilters, filtersSelector } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
// import { createSelector } from "reselect";
import { useHttp } from "../../hooks/http.hook";
import HeroesFiltersBtn from "../heroesFiltersBtn/HeroesFiltersBtn";
import store from "../../store";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = filtersSelector.selectAll(store.getState());

  useEffect(() => {
    dispatch(fetchFilters(request));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    return arr?.map((filter) => {
      return (
        <HeroesFiltersBtn
          label={filter.label}
          nameBtn={filter.name}
          key={filter.id}
          setFilter={() => dispatch(heroesSetFilter(filter.name))}
        />
      );
    });
  };
  const items = renderFilters(filters);
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{items}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
