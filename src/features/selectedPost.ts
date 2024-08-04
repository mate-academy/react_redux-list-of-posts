import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  selectedPost: null | Post;
};

const initialState: State = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    resetSelectedPost: state => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = null;
    },
    setSelectedPost: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export default selectedPostSlice.reducer;

export const { resetSelectedPost, setSelectedPost } = selectedPostSlice.actions;
