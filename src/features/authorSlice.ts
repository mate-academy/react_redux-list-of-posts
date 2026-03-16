/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

interface UsersState {
  author: User | null;
}
const initialState: UsersState = {
  author: null,
};

// export const fetchAuthor = createAsyncThunk(
//   'author/fetch',
//   async (id: number) => {
//     const author = await getUser(id);

//     return author;
//   },
// );

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author;
export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
