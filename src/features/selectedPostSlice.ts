import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../types/Post';
import type { RootState } from '../app/store';

type InitialState = Post | null;

const initialPost: InitialState = null as InitialState;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost,
  reducers: {
    set: (_state, action: PayloadAction<Post | null>) => {
      return action.payload;
    },

  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
export const selectedPostStates = (state: RootState) => state.selectedPost;
