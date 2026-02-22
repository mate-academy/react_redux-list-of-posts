import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | undefined;
};

const initialState: SelectedPostState = {
  selectedPost: undefined,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | undefined>) => {
      return { ...state, selectedPost: action.payload };
    },
  },
});

export const { actions } = selectedPostSlice;
export default selectedPostSlice.reducer;
