import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
    heroesSetFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});
const { actions, reducer } = filterSlice;

export default reducer;
export const { heroesSetFilter } = actions;
