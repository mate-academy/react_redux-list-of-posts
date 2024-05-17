/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/Post";

type SelectedPost = {
  post: Post | null;
};

const initialState: SelectedPost = {
  post: null,
};

const SelectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },

    remove: state => {
      state.post = null;
    },
  },
});

export default SelectedPostSlice.reducer;
export const { select, remove } = SelectedPostSlice.actions;
