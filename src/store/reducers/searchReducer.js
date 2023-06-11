import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearching: false,
  searchText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      return (state = {
        isSearching: action.payload.isSearching,
        searchText: action.payload.searchText,
      });
    },
    clearSearch: (state) => {
      return (state = initialState);
    },
  },
});

export const { search, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
