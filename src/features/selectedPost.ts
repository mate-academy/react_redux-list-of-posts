import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface State {
  selectedPost: Post | null;
}

const initialState: State = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (
      state: State,
      action: PayloadAction<Post | null>,
    ) => ({
      ...state,
      selectedPost: action.payload,
    }),
  },
});

export const { setSelectedPost } = selectedPostSlice.actions;
