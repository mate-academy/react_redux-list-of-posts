import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as Post | null,
  reducers: {
    setSelectedPost: (
      _selectedPost,
      action: PayloadAction<Post | null>,
    ) => action.payload,
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
