import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

type PostState = {
  post: Post | null;
};

const initialState: PostState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Post | null>) => {
      state.post = payload;
    },
  },
});

export const { reducer, actions } = selectedPostSlice;
