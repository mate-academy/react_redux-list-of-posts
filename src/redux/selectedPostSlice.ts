import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export interface SelectedPostState {
  post: Post | null;
}

const initialState: SelectedPostState = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        post: action.payload,
      };
    },
    setNull: state => {
      return {
        ...state,
        post: null,
      };
    },
  },
});

export const { setPost, setNull } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
