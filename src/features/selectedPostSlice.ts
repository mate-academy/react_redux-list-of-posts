import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  selectedPost: Post | null;
};

const initialState: InitialState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { set } = selectedPostSlice.actions;
