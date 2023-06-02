import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

type InitialState = {
  initial: Post | null,
};

const initialPost: InitialState = {
  initial: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialPost,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.initial = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
export const selectedPost = (state: RootState) => state.currentPost.initial;
