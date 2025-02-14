import { initialState, setUser, userSlice } from '../slice';
import { getUser, login, logout, registerUser } from '../actions';

describe('userSlice', () => {
  it('should return initial state by default', () => {
    const result = userSlice.reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const action = setUser({ email: 'a@b.c', name: 'Test' });
    const result = userSlice.reducer(initialState, action);
    expect(result.user).toEqual({ email: 'a@b.c', name: 'Test' });
  });

  it('should handle getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: { email: 'test@ya.ru', name: 'Name' } }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.isAuthChecked).toBe(true);
    expect(result.isAuthenticated).toBe(true);
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { email: 'reg@ya.ru', name: 'Reg' }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.user).toEqual({ email: 'reg@ya.ru', name: 'Reg' });
    expect(result.isAuthenticated).toBe(true);
  });

  it('should handle login.fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { email: 'login@ya.ru', name: 'Login' }
    };
    const result = userSlice.reducer(initialState, action);
    expect(result.user).toEqual({ email: 'login@ya.ru', name: 'Login' });
    expect(result.isAuthenticated).toBe(true);
  });

  it('should handle logout.fulfilled', () => {
    const filledState = {
      user: { email: 'some@user', name: 'Some' },
      isAuthChecked: false,
      isAuthenticated: true,
      error: ''
    };
    const action = { type: logout.fulfilled.type };
    const result = userSlice.reducer(filledState, action);
    expect(result.user).toBeNull();
    expect(result.isAuthenticated).toBe(false);
    expect(result.isAuthChecked).toBe(true);
  });
});
