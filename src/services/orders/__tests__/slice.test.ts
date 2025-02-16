import { ordersSlice, initialState, resetOrderModalData } from '../slice';
import { createOrder, getOrders } from '../actions';

describe('ordersSlice', () => {
  it('should return initial state on first run', () => {
    const result = ordersSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle getOrders.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: ['fakeOrder1', 'fakeOrder2']
    };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.orders).toEqual(['fakeOrder1', 'fakeOrder2']);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.orderRequest).toBe(true);
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: {
        order: { number: 123 },
        name: 'TestName'
      }
    };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.orderModalData).toEqual({ number: 123 });
    expect(result.orders).toEqual([{ number: 123 }]);
    expect(result.orderRequest).toBe(false);
  });

  it('should handle createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result.orderRequest).toBe(false);
  });

});
