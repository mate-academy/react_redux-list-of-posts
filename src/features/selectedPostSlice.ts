import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPost = null | Post;
const initialState: SelectedPost = null as SelectedPost;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (_state, action) => action.payload,
  },
});
