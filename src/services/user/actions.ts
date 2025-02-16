import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

const handleApiRequest = async (
  apiCall: () => Promise<any>,
  rejectWithValue: Function,
  setTokensOnSuccess = false
) => {
  try {
    const response = await apiCall();
    if (!response.success) {
      return rejectWithValue(response);
    }

    if (setTokensOnSuccess) {
      const { accessToken, refreshToken } = response;
      setTokens(accessToken, refreshToken);
    }

    return response;
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getUser = createAsyncThunk(
  'users/getUser',
  async (_, { rejectWithValue }) =>
    await handleApiRequest(getUserApi, rejectWithValue)
);

export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'users/registerUser',
  async (data, { rejectWithValue }) => {
    const response = await handleApiRequest(
      () => registerUserApi(data),
      rejectWithValue,
      true
    );
    return response.user;
  }
);

export const login = createAsyncThunk<TUser, TLoginData>(
  'users/login',
  async (data, { rejectWithValue }) => {
    const response = await handleApiRequest(
      () => loginUserApi(data),
      rejectWithValue,
      true
    );
    return response.user;
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    const response = await handleApiRequest(logoutApi, rejectWithValue);
    if (response.success) {
      resetTokens();
    }
  }
);

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const resetTokens = () => {
  localStorage.clear();
  deleteCookie('accessToken');
};
