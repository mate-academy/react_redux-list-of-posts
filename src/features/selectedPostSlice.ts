import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostStateType {
  selectedPost: Post | null;
}

const initialState: SelectedPostStateType = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    addSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },
});

export const { addSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
