export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroesAddNew = (newHero) => {
  return {
    type: "HEROES_ADD",
    payload: newHero,
  };
};
export const heroesRemove = (id) => {
  return {
    type: "HEROES_REMOVE",
    payload: id,
  };
};
export const heroesSetFilter = (filter) => {
  return {
    type: "HEROES_SET_ACTIVE_FILTER",
    payload: filter,
  };
};
export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};
