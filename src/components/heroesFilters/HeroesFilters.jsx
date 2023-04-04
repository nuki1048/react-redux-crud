// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
  heroesSetFilter,
} from "../../actions";
import Spinner from "../spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";
import HeroesFiltersBtn from "../heroesFiltersBtn/HeroesFiltersBtn";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filtersLoadingStatus, filters } = useSelector((state) => state);

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
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
          key={filter.name}
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
