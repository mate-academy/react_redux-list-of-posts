import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const fetchAuthor = createAsyncThunk(
  'author/fetchAuthor',
  async (userId: number) => {
    const user = await getUser(userId);

    return user;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      return {
        ...state,
        author: action.payload,
      };
    });
  },
});

export const authorReducer = authorSlice.reducer;
export type { AuthorState };
