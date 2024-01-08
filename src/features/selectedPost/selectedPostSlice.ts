/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  value: Post | null;
}

const initialState: SelectedPostState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedPost } = authorSlice.actions;

export default authorSlice.reducer;
