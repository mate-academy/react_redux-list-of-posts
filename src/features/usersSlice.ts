import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  value: User[];
};

const initialState: State = {
  value: [],
};

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', () => {
  return new Promise<User[]>((resolve, reject) => {
    getUsers().then(resolve).catch(reject);
  });
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchUsersAsync.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.value = action.payload;
      },
    );
  },
});

export const actions = usersSlice.actions;

export default usersSlice.reducer;
