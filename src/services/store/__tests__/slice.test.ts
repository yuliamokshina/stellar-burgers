import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient
} from '../../burger-creator/slice';
import { TConstructorState } from '../../burger-creator/slice';

describe('burgerConstructorSlice', () => {
  const initialState: TConstructorState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state on first run', () => {
    const result = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle addIngredient with bun', () => {
    const bun = {
      _id: 'bun1',
      type: 'bun',
      name: 'Test Bun',
      price: 100
    } as any;

    const result = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    expect(result.bun?._id).toBe('bun1');
    expect(result.ingredients.length).toBe(0);
  });

  it('should handle addIngredient with main item', () => {
    const main = {
      _id: 'main1',
      type: 'main',
      name: 'Test Meat'
      // ...
    } as any;

    const result = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(main)
    );
    expect(result.bun).toBeNull();
    expect(result.ingredients.length).toBe(1);
    expect(result.ingredients[0]._id).toBe('main1');
  });

  it('should handle removeIngredient', () => {
    const stateWith2 = {
      bun: null,
      ingredients: [
        { _id: 'ing1', type: 'main', id: 'unique1' },
        { _id: 'ing2', type: 'main', id: 'unique2' }
      ]
    } as any;

    const result = burgerConstructorSlice.reducer(
      stateWith2,
      removeIngredient('unique1')
    );
    expect(result.ingredients.length).toBe(1);
    expect(result.ingredients[0].id).toBe('unique2');
  });

  it('should handle upIngredient', () => {
    const state = {
      bun: null,
      ingredients: [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B' },
        { id: 'c', name: 'C' }
      ]
    } as any;

    const result = burgerConstructorSlice.reducer(state, upIngredient(1));
    expect(result.ingredients[0].id).toBe('b');
    expect(result.ingredients[1].id).toBe('a');
    expect(result.ingredients[2].id).toBe('c');
  });

  it('should handle downIngredient', () => {
    const state = {
      bun: null,
      ingredients: [
        { id: 'a', name: 'A' },
        { id: 'b', name: 'B' },
        { id: 'c', name: 'C' }
      ]
    } as any;

    const result = burgerConstructorSlice.reducer(state, downIngredient(1));
    expect(result.ingredients[0].id).toBe('a');
    expect(result.ingredients[1].id).toBe('c');
    expect(result.ingredients[2].id).toBe('b');
  });
});
