/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { customCreateSlice } from './UsersSlice';
import { Post } from '../types/Post';
import { authorSlice } from './AuthorSlice';

type PostsSliceType = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsSliceType = {
  items: [],
  loaded: false,
  hasError: '',
};

export const postsSlice = customCreateSlice({
  name: 'posts',
  initialState: initialState,
  reducers(create) {
    return {
      loadAuthorPosts: create.asyncThunk(
        async (userId: number) => {
          return getUserPosts(userId);
        },
        {
          pending: state => {
            state.loaded = true;
            state.hasError = '';
          },
          rejected: state => {
            state.hasError = 'Something went wrong';
          },
          fulfilled: (state, { payload }: PayloadAction<Post[]>) => {
            state.items = payload;
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),
    };
  },
  extraReducers(builder) {
    builder.addCase(authorSlice.actions.set, state => {
      state.items = [];
    });
  },
});
