import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  value: Post | null;
};

const initialState: InitialState = {
  value: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (_state, action: PayloadAction<Post | null>) => {
      return { value: action.payload };
    },
  },
});

export default selectedPostSlice.reducer;
export const { selectPost } = selectedPostSlice.actions;
