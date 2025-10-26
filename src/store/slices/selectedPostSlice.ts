/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type SelectedPostType = {
  selectedPost: Post | null;
};

const initialState: SelectedPostType = {
  selectedPost: null,
};

export const init = createAsyncThunk<Post[], number>('posts/init', id => {
  return getUserPosts(id);
});

const selectedPostSlice = createSlice({
  name: 'postsId',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
