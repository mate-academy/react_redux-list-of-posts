import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as SelectedPost,
  reducers: {
    set: (_, action: PayloadAction<SelectedPost>) => action.payload,
    remove: () => null,
  },
});

export const { actions, reducer } = selectedPostSlice;
