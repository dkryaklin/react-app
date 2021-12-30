import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

const searchParams = new URLSearchParams(window.location.search);

interface QueryState {
  value: string;
}

const initialState: QueryState = {
  value: searchParams.get("q") || "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setQuery } = querySlice.actions;

export const selectQuery = (state: RootState) => state.query.value;

export default querySlice.reducer;
