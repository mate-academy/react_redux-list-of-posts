import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostStateType {
  selectedPost: Post | null;
}

const initialState: SelectedPostStateType = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => {
      return { ...state, selectedPost: action.payload };
    },

    clear: state => {
      return { ...state, selectedPost: null };
    },
  },
});

export default selectedPostSlice.reducer;
export const { set, clear } = selectedPostSlice.actions;
