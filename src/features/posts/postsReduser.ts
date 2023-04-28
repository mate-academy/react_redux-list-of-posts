import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

type InitialState = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: InitialState = {
  posts: [],
  loading: false,
  error: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  (idUser: number) => getUserPosts(idUser),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      return { ...state, loading: true, error: false };
    });
    builder.addCase(
      initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return { ...state, loading: false, posts: action.payload };
      },
    );
    builder.addCase(initPosts.rejected, (state) => {
      return { ...state, loading: false, error: true };
    });
  },
});

export const postsReduser = postsSlice.reducer;
