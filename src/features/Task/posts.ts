/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { client } from '../../utils/axiosClient';
import { RootState } from '../../app/store';

type PostsTypeState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsTypeState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadingPosts = createAsyncThunk<
  Post[],
  number,
  { state: RootState }
>(
  'posts/fetch',
  async (userId: number) => {
    const data = await client.get<Post[]>(`/posts?userId=${userId}`);

    return data;
  },
  {
    condition: (userId, { getState }) => {
      const { posts } = getState();

      if (posts.items.length === 0) {
        return true;
      }

      const currentUserId = posts.items[0].userId;

      return Number(currentUserId) !== Number(userId);
    },
  },
);
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadingPosts.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadingPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(loadingPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
