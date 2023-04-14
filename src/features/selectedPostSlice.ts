import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type Props = { post : Post | null };

const initialState: Props = { post: null };

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action:PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const { setPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
