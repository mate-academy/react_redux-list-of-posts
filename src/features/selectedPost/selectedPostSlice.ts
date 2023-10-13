import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  selectedPost: Post | null;
}

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
});

export const { actions } = selectedPostSlice;

export default selectedPostSlice.reducer;
