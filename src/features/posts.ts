import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  hasError: '',
  items: [] as Post[],
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers(create) {
    return {
      addPost: create.reducer((state, { payload }: PayloadAction<Post>) => {
        state.items.push(payload);
      }),
      removePost: create.reducer((state, { payload }: PayloadAction<Post>) => {
        state.items = state.items.filter(item => item !== payload);
      }),
      clearPosts: create.reducer(state => {
        state.items = [];
      }),
      loadPosts: create.asyncThunk(
        (userId: number) => {
          return getUserPosts(userId);
        },
        {
          pending: state => {
            state.loaded = true;
          },
          fulfilled: (state, { payload }) => {
            state.items = payload;
          },
          rejected: (state, { error, payload }) => {
            state.hasError = error.message ?? String(payload);
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),
    };
  },
});
