import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { Post } from '../../types/Post';

export interface SelectedPostSliceState {
  selectedPost: Post | null;
}

const initialState: SelectedPostSliceState = {
  selectedPost: null,
};

export const selectedPostSlice = createAppSlice({
  name: 'selectedPost',
  initialState,
  reducers: create => ({
    setSelectedPost: create.reducer((state, action: PayloadAction<Post>) => {
      return { ...state, selectedPost: action.payload };
    }),
    clearSelectedPost: create.reducer(state => {
      return { ...state, selectedPost: null };
    }),
  }),
});
