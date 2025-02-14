// file: src/services/orders/__tests__/actions.test.ts

import { createOrder, getOrders } from '../actions';
import { getOrdersApi, orderBurgerApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

jest.mock('../../burger-creator/slice', () => ({
  clearIngredient: jest.fn(() => ({
    type: 'burgerConstructor/clearIngredient'
  }))
}));

describe('orders actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should dispatch fulfilled if orderBurgerApi resolves with success and has .order', async () => {
      // mock data
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order: { number: 123 },
        name: 'Test order',
        success: true
      });
      const mockDispatch = jest.fn();
      const thunk = createOrder(['ingredient1', 'ingredient2']);

      await thunk(mockDispatch, () => ({}), undefined);

      expect(orderBurgerApi).toHaveBeenCalledWith([
        'ingredient1',
        'ingredient2'
      ]);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'burgerConstructor/clearIngredient'
      });
    });

    it('should return {order:..., name:...} if orderBurgerApi success', async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order: { number: 999 },
        name: 'My order'
      });
      const mockDispatch = jest.fn();
      const thunk = createOrder([]);

      const result = await thunk(mockDispatch, () => ({}), undefined);

      expect(result.payload).toEqual({
        order: { number: 999 },
        name: 'My order'
      });
    });

    it('should NOT dispatch clearIngredient if response has no .order', async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        success: true,
        name: 'No order field'
      });
      const mockDispatch = jest.fn();
      const thunk = createOrder([]);

      const result = await thunk(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).not.toHaveBeenCalledWith({
        type: 'burgerConstructor/clearIngredient'
      });
      expect(result.payload).toEqual({ success: true, name: 'No order field' });
    });
  });
});
