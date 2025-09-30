import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  hasError: false,
  errorMessage: '',
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
        return {
          ...state,
          items: state.items.filter(item => item.id !== payload.id),
        };
      }),
      clearPosts: create.reducer(() => {
        return { ...initialState };
      }),
      loadPosts: create.asyncThunk(
        (userId: number) => {
          return getUserPosts(userId);
        },
        {
          pending: state => {
            return {
              ...state,
              loaded: false,
              hasError: false,
              errorMessage: '',
            };
          },
          fulfilled: (state, { payload }) => {
            return { ...state, items: payload };
          },
          rejected: (state, { error, payload }) => {
            return {
              ...state,
              hasError: true,
              errorMessage: error.message ?? String(payload),
            };
          },
          settled: state => {
            return { ...state, loaded: true };
          },
        },
      ),
    };
  },
});
