/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import productService from '../services/product.service';

const initialState = { entities: [], isLoading: true, error: null };

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequested(state) {
      state.isLoading = true;
    },
    productsRequestedFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer: productsReducer } = productSlice;

const { recived, productsRequested, productsRequestedFailed } = actions;

export const loadProducts = () => async dispatch => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.get();
    dispatch(recived(content));
  } catch (error) {
    dispatch(productsRequestedFailed(error.message));
  }
};

export const getProducts = () => state => state.products.entities;
export const getProductsLoadingStatus = () => state => state.products.isLoading;
export const getProductsError = () => state => state.products.error;

export default productsReducer;