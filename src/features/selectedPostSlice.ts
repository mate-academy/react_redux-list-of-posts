import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type State = Post | null;

const selectedPostState: State = null;

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState: selectedPostState as State,
  reducers: {
    setPost: (_, action: PayloadAction<State>) => action.payload,
  },
});

export const { setPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
