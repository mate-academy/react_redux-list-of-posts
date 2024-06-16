import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      state: SelectedPostState,
      action: PayloadAction<Post | null>,
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.post = action.payload;
    },
  },
});

export const selectSelectedPost = (state: RootState) => state.selectedPost.post;

export default selectedPost.reducer;
export const { actions } = selectedPost;
