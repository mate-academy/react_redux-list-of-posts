/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

const initialState: Post | null = {
  id: null,
  userId: 0,
  title: '',
  body: '',
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, action) => action.payload,
  },
});

export const selectPost = (state: RootState) => state.selectedPost;

export const { setSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
