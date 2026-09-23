import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const getPostsThunk = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostsThunk.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(
      getPostsThunk.fulfilled,
      (state, action: PayloadAction<Post[]>) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }),
    );
    builder.addCase(getPostsThunk.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default postsSlice.reducer;
