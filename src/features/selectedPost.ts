/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: null as State,
  reducers: {
    set: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
