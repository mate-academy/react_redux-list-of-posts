import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

const initialState = {
  selectedPost: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
