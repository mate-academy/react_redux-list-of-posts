import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  post: Post | null;
};

const initialState: InitialState = {
  post: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },

    clear: state => {
      state.post = null;
    },
  },
});

export default postSlice.reducer;
export const { select, clear } = postSlice.actions;
