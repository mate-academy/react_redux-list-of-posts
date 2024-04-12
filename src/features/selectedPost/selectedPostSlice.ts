/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { actions as authorActions } from '../author/authorSlice';
import { RootState } from '../../app/store';

type PostId = Post['id'];

type State = {
  id: PostId;
};

const initialState: State = {
  id: -1,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<PostId>) => {
      state.id = payload;
    },
    remove: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(authorActions.set.type, () => initialState);
  },
});

export const actions = selectedPostSlice.actions;

export const selectors = {
  selectId: (state: RootState) => state.author.id,
  selectPost: (state: RootState) =>
    state.posts.items.find(post => post.id === state.selectedPost.id) || null,
};
