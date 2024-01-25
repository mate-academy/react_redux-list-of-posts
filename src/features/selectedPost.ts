import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const initialState: State = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_state, { payload: selectedPost }) => selectedPost,
  },

});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
