import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const getUsersThunk = createAsyncThunk('users/getUsers', async () => {
  const response = await getUsers();

  return response;
});

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersThunk.pending, state => ({
      ...state,
      loaded: true,
      hasError: false,
    }));
    builder.addCase(
      getUsersThunk.fulfilled,
      (state, action: PayloadAction<User[]>) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }),
    );
    builder.addCase(getUsersThunk.rejected, state => ({
      ...state,
      hasError: true,
    }));
  },
});
export default userSlice.reducer;
