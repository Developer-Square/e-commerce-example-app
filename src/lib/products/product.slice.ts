/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IProduct } from "./products.types";

export interface IProductState {
  productsState: IProduct[];
}

const initialState: IProductState = {
  productsState: [],
};

export const productsSlice = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.productsState = action.payload;
    },
  },
});

export const { addProducts } = productsSlice.actions;

export default productsSlice.reducer;
