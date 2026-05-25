/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export type UsersState = {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
};

type AxiosLike<T> = { data: T };

const isAxiosLike = <T>(resp: unknown): resp is AxiosLike<T> => {
  return (
    typeof resp === 'object' &&
    resp !== null &&
    'data' in resp &&
    (resp as AxiosLike<T>).data !== undefined
  );
};

export const fetchUsers = createAsyncThunk<User[], void>(
  'users/fetchUsers',
  async () => {
    const resp = await getUsers();

    if (isAxiosLike<User[]>(resp)) {
      return resp.data ?? [];
    }

    return Array.isArray(resp) ? resp : [];
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load users';
      });
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
