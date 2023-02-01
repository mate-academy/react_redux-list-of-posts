import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

interface State {
  loaded: boolean,
  hasError: boolean,
  posts: Post[],
}

const initialState: State = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const init = createAsyncThunk(
  'posts/fetch',
  (id: number) => getUserPosts(id),
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      posts: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      loaded: true,
      hasError: false,
      posts: action.payload,
    }));

    builder.addCase(init.rejected, (state) => ({
      ...state,
      hasError: true,
    }));
  },
});

export default postSlice.reducer;

export const { set } = postSlice.actions;
