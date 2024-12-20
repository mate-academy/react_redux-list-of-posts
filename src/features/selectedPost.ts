/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  post: Post | null;
};

const initialValue: InitialState = {
  post: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: initialValue,
  reducers: {
    setPost: (state, actions) => {
      state.post = actions.payload;
    },

    clearPost: state => {
      state.post = null;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
