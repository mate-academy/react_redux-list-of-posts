import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

type InitialState = {
  selectedPost: Post | null;
};
const initialState: InitialState = {
  selectedPost: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, { payload }: PayloadAction<Post | null>) => ({
      selectedPost: payload,
    }),
  },
});
