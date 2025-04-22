import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as null | Post,
  reducers: {
    clearSelectedPost: () => null,
    setSelectedPost: (_state, action: PayloadAction<Post>) => action.payload,
  },
});

export const { clearSelectedPost, setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
