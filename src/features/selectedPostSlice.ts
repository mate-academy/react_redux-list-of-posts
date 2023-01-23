import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const initialState = null as State;

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (_, action: PayloadAction<State>) => action.payload,
  },
});

export default selectedPostSlice.reducer;
export const { setSelectedPost } = selectedPostSlice.actions;
