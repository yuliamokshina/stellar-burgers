import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// Селекторы
export const getAllIngredients = (state: { ingredients: TIngredientsState }) =>
  state.ingredients.ingredients;
export const getIngredientsIsLoading = (state: {
  ingredients: TIngredientsState;
}) => state.ingredients.isLoading;
