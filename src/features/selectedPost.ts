import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

interface SelectedPostState {
  item: null | Post;
}

const initialState: SelectedPostState = {
  item: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    set: (state, action) => {
      return {
        ...state,
        item: action.payload,
      };
    },
    clear: state => {
      return {
        ...state,
        item: null,
      };
    },
  },
});

export const selectedPostReducer = selectedPostSlice.reducer;
export type { SelectedPostState };
