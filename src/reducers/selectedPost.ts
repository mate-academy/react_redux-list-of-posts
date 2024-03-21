import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface State {
  selectedPost: Post | null;
}

const initialState: State = {
  selectedPost: null,
};

/* eslint-disable */
const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});
/* eslint-enable */

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
