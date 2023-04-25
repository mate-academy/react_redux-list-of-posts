import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
  selectedPostId: number | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
  selectedPostId: 0,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setClear: (state) => {
      state.selectedPost = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
