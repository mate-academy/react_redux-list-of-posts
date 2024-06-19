import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: Post = {
  id: 0,
  userId: 0,
  title: '',
  body: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (_state, action: PayloadAction<Post>) => {
      return action.payload;
    },

    removePost: () => {
      return initialState;
    },
  },
});

export const { setPost, removePost } = postSlice.actions;
export default postSlice.reducer;
