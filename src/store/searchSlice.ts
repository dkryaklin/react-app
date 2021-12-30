import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ItemInterface } from "components/types";
// import type { RootState } from "store/store";
import { fetchItems, filterItems } from "worker-promise";
import type { RootState } from "store/store";
import {
  getQueryFromSearchParams,
  setQueryToSearchParams,
} from "components/helpers";

interface SearchState {
  query: string;
  loading: boolean;
  renderFrom: number;
  renderTo: number;
  items: ItemInterface[];
  selectedItems: number[];
}

const initialState: SearchState = {
  query: getQueryFromSearchParams(),
  loading: true,
  renderFrom: 0,
  renderTo: 10,
  items: [],
  selectedItems: [],
};

export const fetchItemsThunk = createAsyncThunk(
  "items/fetchItems",
  async (arg, thunkAPI) => {
    await fetchItems();
    return await filterItems((thunkAPI.getState() as RootState).search.query);
  }
);

export const filterItemsThunk = createAsyncThunk(
  "items/filterItems",
  async (query: string, thunkAPI) => {
    const items = await filterItems(query);

    if (query !== (thunkAPI.getState() as RootState).search.query) {
      return thunkAPI.rejectWithValue(query);
    }

    return items;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload;

      setQueryToSearchParams(query);
      state.query = query;
    },
    setRenderItemsRange: (
      state,
      action: PayloadAction<{ renderFrom: number; renderTo: number }>
    ) => {
      state.renderFrom = action.payload.renderFrom;
      state.renderTo = action.payload.renderTo;
    },
    unselectItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const index = state.selectedItems.indexOf(itemId);

      if (index !== -1) {
        state.selectedItems.splice(index, 1);
      }
    },
    selectItem: (state, action: PayloadAction<number>) => {
      state.selectedItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload as ItemInterface[];
    });

    builder.addCase(filterItemsThunk.fulfilled, (state, action) => {
      state.items = action.payload as ItemInterface[];
    });
  },
});

export const actions = searchSlice.actions;

export default searchSlice.reducer;
