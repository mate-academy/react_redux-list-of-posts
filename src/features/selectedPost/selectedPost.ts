import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = null as Post | null;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<Post | null>) => {
      return action.payload;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
