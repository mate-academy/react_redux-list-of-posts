import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = {
  post: Post | null
};

const initialState: State = {
  post: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPostId',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => ({
      ...state,
      post: action.payload,
    }),
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
