/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';
import { User } from '../types/User';

type State = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  (userId: User['id']) => {
    return new Promise<Post[]>((resolve, reject) => {
      getPosts()
        .then((allPosts: Post[]) => {
          resolve(allPosts.filter((post: Post) => post.userId === userId));
        })
        .catch(reject);
    });
  },
);

export const postsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },

    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostsAsync.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(
      fetchPostsAsync.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      },
    );

    builder.addCase(fetchPostsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const actions = postsSlice.actions;

export default postsSlice.reducer;
