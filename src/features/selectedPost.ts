/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  selectedPost: null | Post;
};

const initialState: InitialState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },

    clearPost: state => {
      state.selectedPost = null;
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export const { setPost, clearPost } = selectedPostSlice.actions;
