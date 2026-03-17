import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = { loaded: false, hasError: false, items: [] };

export const fetchPostsByUser = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );

    if (!res.ok) {
      throw new Error('Network error');
    }

    return (await res.json()) as Post[];
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPostsByUser.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
