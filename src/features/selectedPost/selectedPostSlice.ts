import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { RootState } from '../../app/store';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => action.payload,
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export const selectSelectedPost = (state: RootState) => state.selectedPost;
export default selectedPostSlice.reducer;
