/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface SelectedPostState {
  item: Post | null,
}

export const initialState: SelectedPostState = {
  item: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.item = action.payload;
    },
    removeSelectedPost: (state) => {
      state.item = null;
    },
  },
});

export const {
  setSelectedPost,
  removeSelectedPost,
} = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost;

export default selectedPostSlice.reducer;
