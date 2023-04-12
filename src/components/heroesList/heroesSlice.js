import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes/");
});

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };
const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesAddNew: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroesRemove: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;
export default reducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);
export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (filter, heroes) =>
    filter === "all" ? heroes : heroes.filter((item) => item.element === filter)
);
export const {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  heroesAddNew,
  heroesRemove,
} = actions;
