import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  post: Post | null;
};

const initialState: InitialState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.post = action.payload;
    },
  },
});

export const { set } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
