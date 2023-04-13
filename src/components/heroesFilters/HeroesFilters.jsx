import { useDispatch } from "react-redux";
import { heroesSetFilter } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
// import { createSelector } from "reselect";

import HeroesFiltersBtn from "../heroesFiltersBtn/HeroesFiltersBtn";

import { useGetFiltersQuery } from "../../api/apiSlice";

const HeroesFilters = () => {
  const { data: filters, isLoading, isError } = useGetFiltersQuery();
  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
