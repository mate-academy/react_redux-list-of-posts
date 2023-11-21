/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type InitialState = {
  selectedPost: Post | null
};

const initialState:InitialState = {
  selectedPost: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { actions } = postSlice;
