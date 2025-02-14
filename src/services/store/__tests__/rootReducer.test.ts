import store from '../../store';
import { AnyAction } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('should return the initial state with empty action', () => {
    const initial = store.getState();
    store.dispatch({ type: '' });
    const after = store.getState();

    expect(after).toEqual(initial);
  });

  it('should return same state for unknown action', () => {
    const initial = store.getState();
    // Любой action, которого нет
    store.dispatch({ type: 'UNKNOWN_ACTION' } as AnyAction);
    const after = store.getState();
    expect(after).toBe(initial);
  });
});
