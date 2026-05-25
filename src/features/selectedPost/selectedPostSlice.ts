import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = {
  selectedPost: Post | null;
};

const initialState: PostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload; // eslint-disable-line no-param-reassign
    },
  },
});

export default selectedPostSlice.reducer;

export const { setPost } = selectedPostSlice.actions;
