import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Post } from '../types/Post';

interface PostState {
  post: Post | null;
}

const initialState: PostState = {
  post: null,
};

export const postStateSlice = createSlice({
  name: 'postState',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
    unselectPost: (state) => {
      state.post = null;
    },
  },
});

export const {
  setPost,
  unselectPost,
} = postStateSlice.actions;

export const postSelector = (state: RootState) => state.postState.post;

export default postStateSlice.reducer;
