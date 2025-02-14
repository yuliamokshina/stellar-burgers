import { ingredientSlice, initialState } from './slice';
import { getIngredients } from './actions';
import { AnyAction } from '@reduxjs/toolkit';

describe('ingredientSlice', () => {
  it('should return initial state at start', () => {
    const result = ingredientSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const result = ingredientSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(true);
  });

  it('should handle getIngredients.fulfilled', () => {
    const mockData = [{ _id: '123', name: 'test ingredient', type: 'main' }];
    const action = { type: getIngredients.fulfilled.type, payload: mockData };
    const result = ingredientSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(mockData);
  });

  it('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Failed' }
    } as AnyAction;
    const result = ingredientSlice.reducer(initialState, action);
    expect(result.isLoading).toBe(false);
  });
});
