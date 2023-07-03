import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPost = {
  post: Post | null,
  isSelected: boolean,
};

const initialState: SelectedPost = {
  post: null,
  isSelected: false,
};

const selectedPostSlice = createSlice({
  name: 'selectedSlice',
  initialState,
  reducers: {
    select: (state: SelectedPost, action: PayloadAction<Post>) => {
      return { ...state, post: action.payload, isSelected: true };
    },

    clear: (state: SelectedPost) => {
      return { ...state, post: null, isSelected: false };
    },
  },
});

export default selectedPostSlice.reducer;
export const { select, clear } = selectedPostSlice.actions;
