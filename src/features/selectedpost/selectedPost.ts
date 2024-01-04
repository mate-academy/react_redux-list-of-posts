import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type State = {
  selectedPost: Post | null;
};

const initialState: State = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    clearSelectedPost: (state) => {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
});

export const { setSelectPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
