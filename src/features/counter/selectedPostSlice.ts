import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type PostState = Post | null;

const initialState: PostState = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialState as PostState,
  reducers: {
    selectPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { selectPost } = selectedPostSlice.actions;
