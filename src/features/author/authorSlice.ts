/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

type AuthorState = {
  author: User | null;
  authorPosts: Post[];
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthorState = {
  author: null,
  authorPosts: [],
  isLoading: false,
  error: null,
};

export const loadPosts = createAsyncThunk(
  'author/fetchAuthorPosts',
  async (userId: number) => {
    const promise = await getUserPosts(userId);

    return promise;
  },
);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.authorPosts = [];
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.authorPosts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadPosts.rejected, (state) => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
