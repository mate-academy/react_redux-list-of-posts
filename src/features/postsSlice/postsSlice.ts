import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number) => {
    const res = await getUserPosts(userId);

    return res;
  },
);

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          loaded: true,
          hasError: false,
          items: action.payload,
        };
      })
      .addCase(fetchPosts.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchPosts.rejected, state => {
        return {
          ...state,
          loaded: false,
          hasError: true,
        };
      });
  },
});

export default postsSlice.reducer;
