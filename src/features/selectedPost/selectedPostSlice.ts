import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

interface SelectedPostState {
  item: Post | null;
}

const initialState: SelectedPostState = {
  item: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.item = action.payload;
    },
    clearSelectedPost: state => {
      state.item = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
export type { SelectedPostState };
