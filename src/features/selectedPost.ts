import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  selectPost: Post | null;
}

const initialState: SelectedPostState = {
  selectPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectPost',
  initialState,
  reducers: {
    currentPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectPost: action.payload,
      };
    },
  },
});

export const { currentPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
