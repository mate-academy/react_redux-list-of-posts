/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    take: (
      state,
      action: PayloadAction<{ posts: Post[], selectedPostId: number }>,
    ) => {
      const { posts, selectedPostId } = action.payload;

      const selectedPost = posts.find(post => post.id === selectedPostId);

      if (selectedPost) {
        state.selectedPost = selectedPost;
      }
    },

    clear: () => {
      return initialState;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
