import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearIngredient } from '../burger-creator/slice';

const handleApiCall = async (
  apiCall: () => Promise<any>,
  rejectWithValue: Function
) => {
  try {
    return await apiCall();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return rejectWithValue(message);
  }
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    const response = await handleApiCall(
      () => orderBurgerApi(ingredients),
      rejectWithValue
    );
    if (response?.order) {
      dispatch(clearIngredient());
      return { order: response.order, name: response.name };
    }
    return response;
  }
);

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) =>
    await handleApiCall(getOrdersApi, rejectWithValue)
);
