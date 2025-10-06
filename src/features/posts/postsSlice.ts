import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  hasError: '',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => ({
        ...state,
        loaded: true,
        posts: action.payload,
      }),
    );

    builder.addCase(loadPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: 'Something went wrong!',
    }));
  },
});

export default postsSlice.reducer;
