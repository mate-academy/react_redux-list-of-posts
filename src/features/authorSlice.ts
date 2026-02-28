/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { User } from '../types/User';

export interface AuthorState {
  selectedPost: Post | null;
  selectedUser: User | null;
}

const initialState: AuthorState = {
  selectedPost: null,
  selectedUser: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    unSetSelectedPost: state => {
      state.selectedPost = null;
    },

    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedPost, unSetSelectedPost, setSelectedUser } =
  authorSlice.actions;

export default authorSlice.reducer;
