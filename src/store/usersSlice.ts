/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  createSlice, PayloadAction, createAsyncThunk, AnyAction,
} from '@reduxjs/toolkit';
import { BASE_URL } from '../api/api';

export const fetchUsers = createAsyncThunk<User[], undefined, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/users`);
    //

    if (!response.ok) {
      return rejectWithValue('Server Error!');
    }

    const data = await response.json();

    return data;
  },
);

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

type UserState = {
  users: User[],
  selectedUserId: User['id'],
  loading: boolean;
  error: string | null
};

const initialState: UserState = {
  users: [],
  selectedUserId: 0,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getSelectUserId(state, action: PayloadAction<User['id']>) {
      state.selectedUserId = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { getSelectUserId } = usersSlice.actions;

export default usersSlice.reducer;
