/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../api/users';
import { User } from '../../../types/User';

export interface UserState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk('users/fetch', async () => {
  // Вызываем функцию, которая идет на сервер за юзерами
  const usersFromServer = await getUsers();

  // То, что возвращает thunk, автоматически станет action.payload
  return usersFromServer;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 1. Когда запрос только начался
      .addCase(initUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      // 2. Когда сервер успешно вернул данные
      .addCase(initUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload; // сохраняем массив юзеров в стейт
      })
      // 3. Если на сервере произошла ошибка
      .addCase(initUsers.rejected, state => {
        state.loaded = true; // загрузка завершилась, хоть и с ошибкой
        state.hasError = true; // включаем флаг ошибки
      });
  },
});

export default usersSlice.reducer;
