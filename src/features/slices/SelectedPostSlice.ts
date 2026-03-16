/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null;
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    clearSelectedPost: (state) => {
      state.selectedPost = null;
    }
  },
});

export const {setSelectedPost, clearSelectedPost} = SelectedPostSlice.actions;
export default SelectedPostSlice.reducer;
