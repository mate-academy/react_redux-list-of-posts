import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

export interface AuthorStateInterface {
  author: User | null;
}

const initialState: AuthorStateInterface = {
  author: null,
};

export const init = createAsyncThunk(
  'author/fetchAuthor',
  async (id: number) => {
    const user = await getUser(id);

    return user;
  },
);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clearAuthor: state => {
      state.author = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    });
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
