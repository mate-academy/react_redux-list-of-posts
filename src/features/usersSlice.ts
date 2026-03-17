import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: string;
}
const initialState: { loaded: boolean; hasError: boolean; items: User[] } = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!res.ok) {
    throw new Error('Network error');
  }

  return (await res.json()) as User[];
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export const usersReducer = usersSlice.reducer;
