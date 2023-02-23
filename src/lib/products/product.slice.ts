/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { IProduct } from "./products.types";

export interface IProductState {
  productsState: IProduct[];
  filteredProductsState: IProduct[];
  isFiltering: boolean;
}

const initialState: IProductState = {
  productsState: [],
  filteredProductsState: [],
  isFiltering: false,
};

export const productsSlice = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.productsState = action.payload;
    },
    addFilteredProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.filteredProductsState = action.payload;
    },
    isFiltering: (state, action: PayloadAction<boolean>) => {
      state.isFiltering = action.payload;
    },
  },
});

export const { addProducts, addFilteredProducts, isFiltering } =
  productsSlice.actions;

export default productsSlice.reducer;
