import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type SelectedPostState = {
  post: Post | null;
};

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post>) => ({
      ...state,
      post: action.payload,
    }),
    close: state => ({
      ...state,
      post: null,
    }),
  },
});

export const { set, close } = selectedPostSlice.actions;
export const selectedPostReducer = selectedPostSlice.reducer;
