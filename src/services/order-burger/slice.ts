import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from '../orders/actions';

export type TOrderBurgerState = {
  order: TOrder | null;
  isOrderLoading: boolean;
};

export const initialState: TOrderBurgerState = {
  order: null,
  isOrderLoading: false
};

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isOrderLoading = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isOrderLoading = false;
      });
  }
});

// Селекторы
export const getOrder = (state: { orderBurger: TOrderBurgerState }) =>
  state.orderBurger.order;
export const getIsOrderLoading = (state: { orderBurger: TOrderBurgerState }) =>
  state.orderBurger.isOrderLoading;

export const { clearOrder } = orderBurgerSlice.actions;
