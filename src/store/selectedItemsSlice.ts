import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

interface SelectedItemsState {
  value: number[];
}

const initialState: SelectedItemsState = {
  value: [],
};

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    unselectItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const index = state.value.indexOf(itemId);

      if (index !== -1) {
        state.value.splice(index, 1);
      }
    },
    selectItem: (state, action: PayloadAction<number>) => {
      state.value.push(action.payload);
    },
  },
});

export const { unselectItem, selectItem } = selectedItemsSlice.actions;

export const selectQuery = (state: RootState) => state.query.value;

export default selectedItemsSlice.reducer;
