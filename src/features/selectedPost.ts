import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostState = {
  selectedPost: Post | null,
};

const initialState: PostState = {
  selectedPost: null,
};

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (value, action: PayloadAction<Post | null>) => {
      return {
        ...value,
        selectedPost: action.payload,
      };
    },
  },
});

export default selectedPostSlice.reducer;
export const { actions } = selectedPostSlice;
