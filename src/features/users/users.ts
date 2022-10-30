/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

// eslint-disable-next-line max-len
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    return await getUsers();
  } catch (err) {
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue('something went wrong');
  }
});

type InitialState = {
  users: User[] | null;
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  users: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = 'error';
        }

        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
