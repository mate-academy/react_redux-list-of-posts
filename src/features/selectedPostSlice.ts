import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: { value: null as Post | null },
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
