import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';
import { RootState } from '../../app/store';

export interface AuthorState {
  item: User | null;
}

const initialState: AuthorState = {
  item: null,
};

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: number) => {
    const response = await getUser(id);

    return response;
  },
);

export const authorSlice = createSlice({
  name: 'autor',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.item = action.payload;
    },
  },
});

export const selectSelectedUser = (state: RootState) => state.selectedUser.item;

export const { setSelectedUser } = authorSlice.actions;

export default authorSlice.reducer;
