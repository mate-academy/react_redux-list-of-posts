import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  items: User[];
  // loading: boolean;
  // error: string;
}

const initialState: UsersState = {
  items: [],
  // loading: false,
  // error: '',
};

export const init = createAsyncThunk('fetch/users', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // builder.addCase(init.pending, (state) => {
    //   state.loading = true;
    // });

    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      // state.loading = false;
    });

    // builder.addCase(init.rejected, (state) => {
    //   state.loading = false;
    //   state.error = 'Something went wrong.';
    // });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
