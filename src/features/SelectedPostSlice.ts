import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

const initialState: { selectedPost?: Post } = {
  selectedPost: undefined,
};

export const selectedPostSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | undefined>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
