/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
type State = {
  post: Post | null;
};

const initialState: State = {
  post: null,
};
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { select } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
