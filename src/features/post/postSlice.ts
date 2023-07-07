/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Post } from '../../types/Post';

export interface UserState {
  post: Post | null;
}

const initialState: UserState = {
  post: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
  },
});

export const selectedPost = (state: RootState) => state.post.post;

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
