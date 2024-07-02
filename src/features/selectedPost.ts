import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  value: null | Post;
};

const initialState: SelectedPostState = { value: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    clearSelectedPost: state => ({ ...state, value: null }),
    addSelectedPost: (state, action) => ({ ...state, value: action.payload }),
  },
});

export const { clearSelectedPost, addSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
