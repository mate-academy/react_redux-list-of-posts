/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostState {
  data: Post | null;
}

const initialState: SelectedPostState = {
  data: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      state.data = action.payload;
    },
    clear: (state) => {
      state.data = null;
    },
  },
});

export const { set, clear } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
